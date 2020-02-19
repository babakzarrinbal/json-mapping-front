<template>
  <div id="app" style="widht:100vw;height:100%;" @drop="createNewJson($event.dataTransfer.files)">
    <Header id="header" @openMenu="expandSettings = true" />
    <transition name="menu">
      <Settings
        v-if="expandSettings"
        :data="Object.keys(data)"
        @hide="expandSettings = false"
        @Export="exportdata"
        @Import="$refs.procin.click()"
        @clearAll="clearAll()"
      />
    </transition>
    <div class="body" style="position:relative">
      <div class="expand" @click="showprocs= !showprocs">{{showprocs ? " - " : " + "}}</div>
      <transition name="proc">
        <div :style="'width:'+ viewWidth + '%'" class="h-100 procedures list-group position-relative p-0" v-if="showprocs">
          <input
            type="file"
            @change="createNewJson($event.target.files);"
            multiple
            style="display:none;"
            ref="procin"
          />
          <div class=" card" style="max-height:100%;overflow-y:scroll;overflow-x:hidden;min-width:250px;" >
            <div class="header  position-sticky card-header bg-info text-light p-2 clickable" style="top:0;z-index:99" @click="collapsed =!collapsed">
              <span>procedure</span>
              <span
                class="collapse-arrow float-right font-weight-bold"
                style="font-size:35px;line-height:20px"
                :class="{'collapsed':collapsed}"
              >&rsaquo;</span>
              <div
                    class="float-right mr-3 border px-2"
                    @click.stop="runProcedures()"
                  >Process:{{proctime ? proctime+" ms" : ""}}</div>
            </div>
            <transition name="collapse">
              <div class="steps card-body px-1 pt-0" v-if="!collapsed">
                <div class="actions position-sticky p-1 pb-3">
                  <div class="btn btn-success btn-sm py-0 clickable" @click="addnewprocedure()">Add Step</div>
                  <div class="btn btn-warning btn-sm py-0 mx-1 clickable" @click="createNewJson()">Add Item</div>
                  <div class="btn btn-danger btn-sm py-0 clickable" @click="reset()">Reset</div>
                  
                </div>
                <div
                  class="p-1 list-group-item procedure"
                  v-for="(p,i) in procedures"
                  :key="i"
                  :class="'list-group-item-'+(p||{}).class"
                  @click="openprocededure = openprocededure == i ? null: i"
                >
                  <div class="row m-0">
                    <span class="mr-2 clickable" @click.stop="moveSteps(i,i+1)">&#8681;</span>
                    <span class="mr-2 clickable" @click.stop="moveSteps(i,i-1)">&#8679;</span>
                    <span class="font-weight-bold">{{i}}: {{(p||{}).name}}</span>
                  </div>
                  <div class="clearfix" />
                  <div
                    class="btn btn-danger py-0 btn-sm  float-right ml-1"
                    @click.stop="procedures = procedures.filter((p,index)=>i!=index);$forceUpdate();"
                  >delete</div>
                  <div
                    class="btn btn-warning btn-sm  py-0 float-left ml-1"
                    @click.stop="addnewprocedure(p.type,p.config,p.name);$forceUpdate();"
                  >duplicate</div>
                  <!-- <div
                    class="btn btn-primary py-0 btn-sm  float-right"
                    @click.stop="openprocededure = i;(p||{}).edit=true;$forceUpdate();"
                    v-if="!(p||{}).edit"
                  >edit</div>
                  <div
                    class="btn btn-success py-0 float-right"
                    @click.stop="openprocededure = null;(p||{}).edit=false;"
                    v-if="(p||{}).edit"
                  >save</div> -->
                  <div class="clearfix" />
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
                            <!-- :disabled="!(p||{}).edit" -->
                          <select
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
                            <span
                              class="bg-warning text-light input-group-text"
                              id="basic-addon1"
                            >Name</span>
                          </div>
                            <!-- :disabled="!(p||{}).edit" -->
                          <input
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
            </transition>
          </div>
        </div>
      </transition>
      <sizechanger @mousemove="sizechanger"/>
      <div :style="'width:'+ (100 - viewWidth) + '%'" class="jsoncontainer">
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
            @click="editjson($event)"
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
  </div>
</template>
<script>
import VueJsonPretty from "vue-json-pretty";
import Header from "./components/header";
import Settings from "./components/settings";
import sizechanger from "./components/sizechanger"
// import initializing from "./components/initializing"
// import Procedure from "./components/procedure";
const jmp = require("json-mapping-procedures");
const _ = require("lodash");
const actiontypes = Object.keys(jmp.config);

let defaultdata = {},
  procedures = [];
  // proceduregroups = [];

let sproc = window.localStorage.getItem("json-mapper_procedures");
let sdata = window.localStorage.getItem("json-mapper_data");
if (sproc) procedures = JSON.parse(sproc);
if (sdata) defaultdata = JSON.parse(sdata);

let data = _.cloneDeep(defaultdata);
export default {
  data() {
    return {
      collapsed:false,
      window,
      expandSettings: false,
      defaultdata,
      data,
      selected: {},
      expanded: {},
      jmp,
      actiontypes,
      showprocs: true,
      procedures,
      proceduregroups: [],
      openprocededure: null,
      proctime: 0,
      dblclick: 0,
      selectedpath: "",
      viewWidth: 30
    };
  },
  components: {
    VueJsonPretty,
    Header,
    Settings,
    sizechanger
    // Procedure
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
    async editjson() {
      if (Date.now() - this.dblclick > 300) return (this.dblclick = Date.now());
      if (!this.selectedpath) return;
      let key = this.selectedpath.slice(this.selectedpath.lastIndexOf(".") + 1);
      let newkey = window.prompt("Change The key?", key);
      if (newkey && key != newkey) {
        let path = !this.selectedpath.includes(".")
          ? ""
          : this.selectedpath.slice(0, this.selectedpath.lastIndexOf(".") + 1);
        await this.addProcedure(
          "fieldRename",
          {
            path: this.selectedpath,
            name: newkey
          },
          "Rename feild @" + this.selectedpath
        );
        this.selectedpath = path + newkey;
      }
      let data = _.get(this.data, this.selectedpath);
      let stringdata;
      try {
        stringdata = JSON.stringify(data);
      } catch (e) {
        stringdata = data.toString();
      }

      let newdata = window.prompt("Change The value?", stringdata);
      if (newdata && newdata != stringdata) {
        this.addProcedure(
          "fieldSetContent",
          {
            path: this.selectedpath,
            data: newdata.toString()
          },
          "Set content @" + this.selectedpath
        );
      }
    },
    copytoclipboard(text) {
      if (!text) text = "";
      this.selectedpath = text;
      text = text.replace(/\[[0-9]+\]/g, "[]");
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
    addnewprocedure(type, data, name) {
      type = type || "fieldAdd";
      let { descriptions, ...config } = { ...this.jmp.config[type] };
      if (data) config = _.cloneDeep(data);
      let newprocedure = {
        name: name || type,
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
      window.localStorage.setItem(
        "json-mapper_procedures",
        JSON.stringify(this.procedures)
      );
      window.localStorage.setItem(
        "json-mapper_data",
        JSON.stringify(this.data)
      );
      await this.reset();
      let startin = Date.now();
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
        console.time(i + ":" + p.name);
        let result = await this.jmp.funcs[p.type](this.data, p.config, p);
        console.timeEnd(i + ":" + p.name);
        if (result) {
          p.class = "danger";
          console.error(result);
          p.error = result;
          for (let j = i + 1; j < this.procedures.length; j++) {
            this.procedures[j].class = "warning";
          }
          break;
        }
        p.class = "success";
      }
      this.proctime = i == this.procedures.length ? Date.now() - startin : 0;
      await this.$forceUpdate();
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
    async exportdata(key) {
      if (key == "__procedures__") return this.downloadfile();
      if (key == "__All__") {
        await this.reset();
        this.downloadfile();
        _.each(this.data, (v, k) => this.downloadfile(v, k + ".json"));
        return;
      }
      this.downloadfile(this.data[key], key + ".json");
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
    createNewJson(files) {
      let _self = this;
      if (!files) {
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
      let j = 0;
      for (let i = 0; i < files.length; i++) {
        let fn = files[i].name;
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
          if (Array.isArray(obj) && obj.every(p => p.config && p.type)) {
            if (_self.procedures && _self.procedures.length) {
              if (window.confirm("Append?")) {
                _self.procedures.push(...obj);
              } else {
                _self.procedures = obj;
              }
            } else {
              _self.procedures = obj;
            }
          } else {
            _self.data[fn] = _.cloneDeep(obj);
            _self.defaultdata[fn] = obj;
          }
          j++;
          if (j == files.length) _self.$refs.procin.value = null;
          _self.$forceUpdate();
        };
        this.expandSettings = false;
        reader.readAsText(files[i]);
      }
    },
    async reset() {
      this.procedures.forEach(p => (p.class = ""));
      this.data = _.cloneDeep(this.defaultdata);
      await this.$nextTick();
      return;
    },
    removeJson(key) {
      if (!window.confirm("Are you sure to Delete?")) return;
      delete this.defaultdata[key];
      delete this.data[key];
      return this.$forceUpdate();
    },
    clearAll(){
      this.defaultdata = {};
      this.data = {};
      this.procedures = [];
       window.localStorage.removeItem("json-mapper_procedures");
       window.localStorage.removeItem("json-mapper_data");
    },
    sizechanger(w){
        this.viewWidth = w;
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
}
#header {
  height: 30px;
}
.body {
  position: relative;
  background-color: white;
  display: flex;
  overflow: hidden;
  padding: 10px;
  height: calc(100% - 30px);
}
.expand {
  z-index: 1000;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 30px;
  height: 30px;
  background-color: gray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
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
    min-width: 200px;
    max-width: 100%;
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
  padding: 10px;
  text-align: left;
  overflow-x: hidden;
  transform-origin: left 0;
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
    top: 41px;
    z-index: 9;
    background-color: white;
  }
}
.clickable {
  user-select: none;
  cursor: pointer;
}
.steps {
  transition: transform 0.3s 0s, height 0s 0.3s;
  transform-origin: top center;
  height: auto;
}
.collapse-arrow{
  transform:rotateZ(90deg);
  transform-origin: center center;
  transition: 0.3s;
  &.collapsed{
    transform:rotateZ(0);
  }

}
</style>
