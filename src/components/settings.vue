<template>
  <div id="settings" @click="hideme()">
    <div class="window" v-on:click.stop>
      <button type="button" class="close text-large" aria-label="Close" @click="hideme()">
        <span aria-hidden="true">&times;</span>
      </button>
      <div
        class="btn btn-warning mt-1"
        style="width: calc(100% - 10px);"
        @click="updateapp()"
      >Update/reset</div>
      <div
        class="btn btn-primary mt-1"
        style="width: calc(100% - 10px);"
        @click="$emit('Import')"
      >Import</div>
      <div
        class="btn btn-success mt-1"
        style="width: calc(100% - 10px);"
        @click="$emit('Export')"
      >Export</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      showpassform: false,
      shownewpass: false,
      showoldpass: false,
      savingpassword: false,
      oldpass: null,
      newpass: null
    };
  },
  created() {},
  methods: {
    hideme: function() {
      this.$emit("hide");
    },
    logout() {
      window.localStorage.setItem("api_token", null);
      this.$root.user = null;
      this.socketreconnect();
      this.hideme();
    },
    updateapp() {
      window.location.reload(true);
    },
    savepassword() {
      let _self = this;
      if (_self.savingpassword) return;
      if (!_self.newpass)
        return window.toastr.warning("new password is not filled");
      _self.savingpassword = true;
      _self
        .socketcall("users/changepass", {
          newpass: _self.newpass,
          oldpass: _self.oldpass
        })
        .then(result => {
          _self.savingpassword = false;
          if (result.error) {
            return window.toastr.error(
              (result.error || {}).message || "couldn't save new password"
            );
          }
          window.toastr.success("password changed!");
          _self.oldpass = null;
          _self.newpass = null;
          _self.showpassform = false;
        });
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
#settings {
  width: 100vw;
  height: 100%;
  position: fixed;
  background-color: #8080805e;
  top: 0;
  right: 0;
  z-index: 99;
  .window {
    float: left;
    height: 100%;
    padding-top: 5px;
    overflow: auto;
    width: 220px;
    background-color: #fff;
    box-shadow: -5px 2px 16px grey;
  }
}
</style>
