<template>
  <div id="app" style="widht:100vw;height:100%;" @drop="createNewJson($event)">
    <div class="expand" @click="showprocs= !showprocs">{{showprocs ? " - " : " + "}}</div>
    <div class="procedures list-group" v-if="showprocs">
      <div class="row ml-1 w-100 d-block">
        <div class="btn btn-secondary float-left mx-1" @click="saveprocedures()">Save</div>
        <div class="btn btn-secondary float-left mx-1" @click="loadprocedures()">Load</div>
        <div class="btn btn-warning float-left mx-1" @click="createNewJson()">Add Item</div>
        <div class="btn btn-primary float-right mx-1" @click="downloadfile()">export</div>
        <div class="btn btn-info float-right mx-1" @click="$refs.procin.click()">import</div>
        <input type="file" @change="importedproc($event)" style="display:none;" ref="procin" />
      </div>
      <div class="actions">
        <div class="btn btn-success" @click="addnewprocedure()">Add Step</div>
        <div
          class="btn btn-info float-right"
          @click="runProcedures()"
        >Process All {{proctime ? proctime+" ms" : ""}}</div>
      </div>
      <div
        class="p-1 list-group-item procedure"
        v-for="(p,i) in procedures"
        :key="i"
        :class="'list-group-item-'+(p||{}).class"
        @click="openprocededure = openprocededure == i ? null: i"
      >
        <span class="mr-2 clickable" @click.stop="moveSteps(i,i+1)">&#8681;</span>
        <span class="mr-2 clickable" @click.stop="moveSteps(i,i-1)">&#8679;</span>
        {{i}}: {{(p||{}).name}}
        <div
          class="btn btn-danger py-0 float-right ml-1"
          @click.stop="procedures = procedures.filter((p,index)=>i!=index);$forceUpdate();"
        >delete</div>
        <div
          class="btn btn-primary py-0 float-right"
          @click.stop="openprocededure = i;(p||{}).edit=true;$forceUpdate();"
          v-if="!(p||{}).edit"
        >edit</div>
        <div
          class="btn btn-success py-0 float-right"
          @click.stop="openprocededure = null;(p||{}).edit=false;"
          v-if="(p||{}).edit"
        >save</div>

        <div class="procedure-detail" v-if="i == openprocededure" @click.stop>
          <div class="editinfo container">
            <div class="row mt-2" :title="(p.descriptions||{}).overall">
              <div class="input-group input-group-sm mb-1 col-6 pr-0">
                <div class="input-group-prepend">
                  <label
                    class="bg-primary text-light input-group-text"
                    for="inputGroupSelect01"
                  >Action Type</label>
                </div>
                <select
                  :disabled="!(p||{}).edit"
                  class="custom-select"
                  id="inputGroupSelect01"
                  v-model="p.type"
                  @change="setstepconfig(p)"
                >
                  <option
                    v-for="(t,index) in actiontypes"
                    :key="index"
                    :value="t"
                    :disabled="t.slice(0,2)=='--'"
                  >{{t}}</option>
                </select>
              </div>
              <div class="input-group input-group-sm mb-1 col-6">
                <div class="input-group-prepend">
                  <span class="bg-warning text-light input-group-text" id="basic-addon1">Name</span>
                </div>
                <input
                  :disabled="!(p||{}).edit"
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  v-model="p.name"
                />
              </div>
              <h5 class="col-12 font-bold mb-2 pb-2 border-bottom border-dark"></h5>
            </div>
            <div class>Step action : {{p.type}}</div>
            <div
              class="input-group mb-1"
              v-for="(c,ci) in p.config"
              :key="ci"
              :title="(p.descriptions||{})[ci]"
            >
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">{{ci}}</span>
              </div>
              <textarea
                :disabled="!(p||{}).edit"
                type="text"
                class="configtextarea form-control"
                :placeholder="(p.descriptions||{})[ci] || ci"
                v-model="p.config[ci]"
              />
            </div>
            <br />
            {{p.error}}
          </div>
        </div>
      </div>
    </div>
    <div class="jsoncontainer">
      <div class="datajson" v-for="(d,k) in data" :key="k">
        <div class="actions">
          <div
            class="title clickable"
            onclick="event.path[2].querySelector('div.vjs-tree.has-selectable-control > div:nth-child(2) > span').click()"
          >{{k}}</div>
          <!-- <div class="action small" @click="copytoclipboard(selected[k])">copy</div> -->
          <div
            class="action small"
            @click="addProcedure('fieldAdd',{
              parent:selected[k] ,
              name: window.prompt('name of field'),
              data:'{}'
            },'adding feild @' + selected[k])"
          >+</div>
          <!-- <div
            class="action small"
            @click="addProcedure(
              'fieldCopy',
              {
              from:selected.origin,
              to: selected[k]
              }
            ,'copy feild from' + selected.origin+' to '+ selected.target
            )"
          >></div>-->
          <div
            class="action small"
            @click="addProcedure(
              'fieldRemove',
              {
              path: selected[k]
              }
            ,'delete feild @' + selected[k]
            )"
          >-</div>
          <div
            class="action small"
            @click="addProcedure(
              'fieldRename',
              {
              path: selected[k],
              name:window.prompt('new Name',selected[k].slice(selected[k].lastIndexOf('.')+1))
              }
            ,'Rename feild @' + selected[k]
            )"
          >I</div>
          <div
            class="action small"
            @click="downloadfile(d,k+'.json')"
            style="transform: rotateZ(90deg);padding: 2px 5px;color: #00f900;border: 1px solid #00f900;"
          >&#x27a4;</div>
          <div class="removebtn clickable" @click="removeJson(k)">X</div>
        </div>
        <vue-json-pretty
          :path="k"
          :data="d"
          :deep="0"
          :highlightMouseoverNode="true"
          :selectableType="'single'"
          :showSelectController="true"
          v-model="selected[k]"
          @change="copytoclipboard"
        ></vue-json-pretty>
      </div>
    </div>
  </div>
</template>
<script>
import VueJsonPretty from "vue-json-pretty";
// import origin from "./orgdata";
// import config from "./config.js";
const jmp = require("json-mapping-procedures");
const _ = require("lodash");
const actiontypes = Object.keys(jmp.config);
let defaultdata = {
  // origin,
  // config,
  // translations: {},
  // target: {}
};
let selected = Object.keys(defaultdata).reduce(
  (cu, c) => ({ ...cu, [c]: null }),
  {}
);
let expanded = Object.keys(defaultdata).reduce(
  (cu, c) => ({ ...cu, [c]: true }),
  {}
);
export default {
  data() {
    return {
      window,
      defaultdata: defaultdata,
      data: _.cloneDeep(defaultdata),
      selected,
      expanded,
      jmp,
      actiontypes,
      showprocs: true,
      procedures: [],
      openprocededure: null,
      proctime: 0
    };
  },
  components: {
    VueJsonPretty
  },
  async created() {
    window.addEventListener(
      "dragover",
      function(e) {
        e = e || event;
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      function(e) {
        e = e || event;
        e.preventDefault();
      },
      false
    );
  },
  methods: {
    // clickhandler(...args) {
    //   console.log(args);
    //   // console.log("seleccted:",this.selected)
    // },
    copytoclipboard(text) {
      if (!text) text = "";
      text = text.replace(/\[[0-9]+\]/g, "[]");
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
    addnewprocedure(type) {
      type = type || "fieldAdd";
      let { descriptions, ...config } = { ...this.jmp.config[type] };
      let newprocedure = {
        name: type,
        type,
        config,
        descriptions,
        edit: true
      };
      this.procedures.push(newprocedure);
      this.openprocededure = this.procedures.length - 1;
    },
    setstepconfig(p) {
      let { descriptions, ...config } = { ...this.jmp.config[p.type] };
      p.config = config;
      p.descriptions = descriptions;
      p.name = p.type;
    },
    async addProcedure(type, config, name) {
      let newprocedure = {
        name,
        type,
        config
      };
      this.procedures.push(newprocedure);

      let result = await this.jmp.funcs[type](this.data, config, newprocedure);
      if (result) {
        newprocedure.class = "danger";
        newprocedure.error = result;
      } else newprocedure.class = "success";
      this.$forceUpdate();
      // this.runProcedures();
    },
    async runProcedures() {
      this.procedures.forEach(p => (p.class = "secondary"));
      this.data = _.cloneDeep(this.defaultdata);
      await this.$nextTick();
      let startin = new Date();
      let i;
      for (i = 0; i < this.procedures.length; i++) {
        let p = this.procedures[i];
        if (!p.type) {
          p.class = "danger";
          p.error = "NO Procedure Defeined!";
          for (let j = i + 1; j < this.procedures.length; j++) {
            this.procedures[j].class = "warning";
          }
          break;
        }
        p.class = "primary";
        let result = await this.jmp.funcs[p.type](this.data, p.config, p);
        if (result) {
          p.class = "danger";
          p.error = result;
          for (let j = i + 1; j < this.procedures.length; j++) {
            this.procedures[j].class = "warning";
          }
          break;
        }
        p.class = "success";
      }
      this.proctime = i == this.procedures.length ? new Date() - startin : 0;
      this.$forceUpdate();
    },
    saveprocedures() {
      window.localStorage.setItem(
        "procedures",
        JSON.stringify(this.procedures)
      );
    },
    loadprocedures() {
      this.procedures = JSON.parse(window.localStorage.getItem("procedures"));
    },
    moveSteps(old_index, new_index) {
      if (new_index >= this.procedures.length) new_index = 0;
      if (new_index == -1) new_index = this.procedures.length - 1;
      this.procedures.splice(
        new_index,
        0,
        this.procedures.splice(old_index, 1)[0]
      );
      return this.procedures; // for testing
    },
    importedproc(e) {
      let _self = this;
      if (!e.target.files.length) return;
      let reader = new FileReader();
      reader.onload = function(event) {
        // let itemkey = window.prompt("json Name?");
        let obj = event.target.result;
        e.target.value = null;
        try {
          obj = JSON.parse(obj);
        } catch (e) {
          return window.alert("unacceptable proccessfile");
        }
        if (!Array.isArray(obj))
          return window.alert("unacceptable proccessfile");
        _self.procedures = obj;
        _self.$forceUpdate();
      };
      reader.readAsText(e.target.files[0]);
    },
    downloadfile(data, filename = "procedures.json", type = "text/plain") {
      data =
        data ||
        this.procedures.map(p => ({
          name: p.name,
          config: p.config,
          type: p.type
        }));

      if (typeof data == "object") data = JSON.stringify(data);
      let file = new Blob([data], { type: type, name: filename });
      if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
      else {
        // Others
        let a = window.document.createElement("a"),
          url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        window.document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          window.document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
    createNewJson(e) {
      let _self = this;
      if (!e) {
        let itemkey = window.prompt("json Name?");
        if (!itemkey) return;
        this.addProcedure(
          "fieldAdd",
          {
            parent: "",
            name: itemkey,
            data: "{}"
          },
          "Add new Root Item"
        );
        this.defaultdata[itemkey] = {};
        this.data[itemkey] = {};
        return this.$forceUpdate();
      }
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        let fn = e.dataTransfer.files[i].name;
        fn = fn.slice(0, fn.lastIndexOf("."));
        let reader = new FileReader();
        reader.onload = function(event) {
          // let itemkey = window.prompt("json Name?");
          let obj = event.target.result;
          try {
            obj = JSON.parse(obj);
          } catch (e) {
            obj = { inputdata: obj };
          }
          if(Array.isArray(obj) && obj.every(p=>p.config && p.type)){
            _self.procedures = obj
          }else{
            _self.data[fn] = obj;
            _self.defaultdata[fn] = obj;
          }
          _self.$forceUpdate();
        };
        reader.readAsText(e.dataTransfer.files[i]);
      }
    },
    removeJson(key) {
      if (!window.confirm("Are you sure to Delete?")) return;
      delete this.defaultdata[key];
      delete this.data[key];
      return this.$forceUpdate();
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  background-color: white;
  overflow: hidden;
  padding: 10px;
}
.expand {
  z-index: 99999;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background-color: gray;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  color: white;
  font-weight: bold;
  font-size: 14px;
}
.jsoncontainer {
  display: flex;
  flex-grow: 1;
  max-height: 100%;

  flex-wrap: wrap;
  overflow: scroll;
  .datajson {
    position: relative;
    margin: 5px;
    min-width: 300px;
    max-width: calc(100% - 450px);
    // min-height:100%;
    max-height: calc(100% - 20px);
    flex-grow: 1;
    flex-shrink: 0;
    text-align: left;
    border: 1px solid gray;
    overflow: scroll;
    overflow-x: hidden;
    .vjs-tree.is-root {
      width: calc(100% - 65px);
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 45px;
      margin-right: 15px;
    }
    .actions {
      display: flex;
      background-color: rgb(143, 143, 255);
      text-align: center;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      justify-content: center;
      align-items: center;
      // margin: -15px -15px 15px -15px;
      .title {
        flex-grow: 1;
        font-weight: bold;
        text-align: left;
        padding-left: 5px;
      }
      .action {
        margin: 0 5px;
        padding: 5px 8px;
        // width: 50px;
        border: 1px solid gray;
        cursor: pointer;
        user-select: none;
      }
    }
    .removebtn {
      padding: 5px 3px;
      color: white;
      background-color: red;
      border-radius: 50%;
      justify-self: center;
      align-self: center;
      float: right;
      padding: 0px 6px;
      margin: 0 4px;
    }
  }
}
.procedures {
  border: 1px solid gray;
  height: 100%;
  width: 450px;
  min-width: 450px;
  max-width: 450px;
  padding: 10px;
  text-align: left;
  overflow: scroll;
  .procedure {
    margin-bottom: 10px;
    .procedure-detail {
      // padding: 10px;
      border-top: 1px solid #c3c1c1;
      margin-top: 10px;
      .configtextarea {
        min-height: 40px;
        overflow-y: auto;
        word-wrap: break-word;
        // max-width:100%;
        // min-width:100%;
      }
    }
  }
  .actions {
    padding: 10px;
  }
}
.clickable {
  user-select: none;
  cursor: pointer;
}
</style>
