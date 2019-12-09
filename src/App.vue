<template>
  <div id="app" style="widht:100vw;height:100%;">
    <div class="jsoncontainer">
      <div class="original">
        <vue-json-pretty
          :path="'origin'"
          :data="data.origin"
          :deep="1"
          :highlightMouseoverNode="true"
          :selectableType="'single'"
          :showSelectController="true"
          v-model="selected.origin"
        ></vue-json-pretty>
        <!-- @click="handleClick" -->
      </div>
      <div class="actions">
        <div
          class="action"
          @click="addProcedure('fieldAdd',{
          parent:selected.target ,
          name: window.prompt('name of field'),
          data:'{}'
        },'adding feild @' + selected.target)"
        >+ {}</div>
        <div
          class="action"
          @click="addProcedure('fieldAdd',{
          parent:selected.target,
          name:window.prompt('name of field'),
          data:'[]'
        },'adding feild @' + selected.target)"
        >+ []</div>
        <div
          class="action"
          @click="addProcedure(
          'fieldCopy',
          {
           from:selected.origin,
           to: selected.target
          }
        ,'copy feild from' + selected.origin+' to '+ selected.target
        )"
        >></div>
        <div
          class="action"
          @click="addProcedure(
          'fieldRemove',
          {
           path: selected.target
          }
        ,'delete feild @' + selected.target
        )"
        >-</div>
        <div
          class="action"
          @click="addProcedure(
          'fieldRename',
          {
           path: selected.target,
           name:window.prompt('new Name')
          }
        ,'Rename feild @' + selected.target
        )"
        >I</div>
      </div>
      <div class="target">
        <vue-json-pretty
          :path="'target'"
          :data="data.target"
          :highlightMouseoverNode="true"
          :selectableType="'single'"
          :showSelectController="true"
          v-model="selected.target"
        ></vue-json-pretty>
        <!-- @change="handleClick" -->
      </div>
    </div>
    <div class="procedures list-group">
      <div class="actions">
        <div class="btn btn-success" @click="addnewprocedure()">Add Step</div>
        <div class="btn btn-info float-right" @click="runProcedures()">Process All</div>
        <div class="btn btn-secondary float-right mx-2" @click="saveprocedures()">Save</div>
        <div class="btn btn-secondary float-right" @click="loadprocedures()">Load</div>
      </div>
      <div
        class="list-group-item procedure"
        v-for="(p,i) in procedures"
        :key="i"
        :class="'list-group-item-'+p.class"
        @click="openprocededure = openprocededure == i ? null: i"
      >
        {{i}}: {{p.name}}
        <div
          class="btn btn-danger py-0 float-right ml-1"
          @click.stop="procedures = procedures.filter((p,index)=>i!=index);runProcedures();$forceUpdate();"
        >delete</div>
        <div
          class="btn btn-primary py-0 float-right"
          @click.stop="openprocededure = i;p.edit=true;$forceUpdate();"
          v-if="!p.edit"
        >edit</div>
        <div
          class="btn btn-success py-0 float-right"
          @click.stop="openprocededure = null;p.edit=false;"
          v-if="p.edit"
        >save</div>

        <div class="procedure-detail" v-if="i == openprocededure" @click.stop>
          <div class="showinfo" v-if="!p.edit">
            {{p.config}}
            <br />
            {{p.error}}
          </div>
          <div class="editinfo" v-else>
            <div class="row">
            <div class="input-group mb-4 col-6">
              <div class="input-group-prepend">
                <span class="bg-warning  text-light input-group-text" id="basic-addon1">Name</span>
              </div>
              <input type="text" class="form-control" placeholder="Name" v-model="p.name" />
            </div>
            <div class="input-group mb-4 col-6">
              <div class="input-group-prepend">
                <label class="bg-primary text-light input-group-text" for="inputGroupSelect01">Action Type</label>
              </div>
              <select class="custom-select" id="inputGroupSelect01" v-model="p.type" @change="setstepconfig(p)">
                <option v-for="(t,index) in actiontypes" :key="index" :value="t">{{t}}</option>
              </select>
            </div>

            </div>
            <div class="">Step action : {{p.type}}</div>
            <div class="input-group mb-1" v-for="(c,ci) in p.config" :key="ci">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">{{ci}}</span>
              </div>
              <input type="text" class="form-control" :placeholder="ci" v-model="p.config[ci]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueJsonPretty from "vue-json-pretty";
import orgdata from "./orgdata";
const funcs = require("json-mapping-procedures");
const actiontypes = Object.keys(funcs).filter(on=>on!="config");
export default {
  data() {
    return {
      window,
      data: {
        origin: orgdata || {},
        target: null
      },
      selected: {
        origin: null,
        target: null
      },
      funcs,
      actiontypes,
      procedures: [],
      openprocededure: null
    };
  },
  components: {
    VueJsonPretty
  },
  async created() {
    
  },
  methods: {
    addnewprocedure(type) {
      type = type|| 'fieldAdd';
      let config ={ ...this.funcs.config[type]};
      let newprocedure = {
        name: type,
        type,
        config,
        edit:true
      };
      this.procedures.push(newprocedure);
      this.openprocededure = this.procedures.length-1
    },
    setstepconfig(p){
      p.config = this.funcs.config[p.type]
    },
    async addProcedure(type, config, name) {
      let newprocedure = {
        name,
        type,
        config
      };
      this.procedures.push(newprocedure);
      
      let result = await this.funcs[type](this.data, config, newprocedure);
      if (result) {
        newprocedure.class = "danger";
        newprocedure.error = result;
      } else newprocedure.class = "success";
      this.$forceUpdate();
      // this.runProcedures();
    },
    async runProcedures() {
      this.procedures.forEach(p => (p.class = "secondary"));
      this.data.target = null;
      for (let i = 0; i < this.procedures.length; i++) {
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
        let result = await this.funcs[p.type](this.data,p.config, p);
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
      this.$forceUpdate();
    },
    saveprocedures(){
      window.localStorage.setItem('procedures',JSON.stringify(this.procedures))
    },
    loadprocedures(){
      this.procedures = JSON.parse(window.localStorage.getItem('procedures'));
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
  background-color: white;
  overflow: hidden;
  padding: 10px;
}
.jsoncontainer {
  display: flex;
  width: 100%;
  height: 50%;
  .original,
  .target {
    padding: 15px;
    width: calc(50% - 35px);
    text-align: left;
    border: 1px solid gray;
    overflow: auto;
    overflow-x: hidden;
    .vjs-tree {
      width: calc(100%-65px);
    }
  }
  .actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;

    .action {
      margin: 10px;
      width: 50px;
      border: 1px solid gray;
      cursor: pointer;
      user-select: none;
    }
  }
}
.procedures {
  border: 1px solid gray;
  height: 50%;
  padding: 10px;
  text-align: left;
  overflow: auto;
  .procedure {
    margin-bottom: 10px;
    .procedure-detail {
      padding: 10px;
      border-top: 1px solid #c3c1c1;
      margin-top: 10px;
    }
  }
  .actions {
    padding: 10px;
  }
}
</style>
