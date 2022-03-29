<template>
  <h1>link-client-test-demo</h1>
  <div class="envBox"></div>
  <div class="buttonBox">
    <button @click="start">链接服务</button>
    <button @click="close">停止服务</button>
    <button @click="refresh">刷新服务</button>
    <button @click="cg_getVersion">cg.getVersion</button>
    <button @click="cg_init">cg.init</button>

    <button @click="sg_getVersion">sg.getVersion</button>
    <button @click="sg_init">sg.init</button>
    <button @click="sg_askAndAnswer">sg.askAndAnswer</button>
    <button @click="sg_listen">sg.listen</button>
    <button @click="sg_close">sg.close</button>
    <button @click="clear">清空日志</button>
  </div>
  <div class="pcConfig">
    平台:
    <input id="inPlatform" value="auto" />
    pcIp:
    <input id="inIP" value="localhost" />
    port:
    <input id="inPort" value="52384" />
  </div>

  <div class="InOutBox">
    <div>
      输入：
      <button id="tsSend" @click="sendButton">发送</button>
    </div>
    <textarea id="msgInput" class="InBox">{"jsonrpc":"2.0","method":"getVersion","params":[""],"id":199,"service":"service-global"}</textarea>

    <br />
    <div>输出</div>
    <br />

    <div id="msgOutput" class="OutBox">output..</div>
    <div>
      支持3端：pc,ios,android;
      <br />操作：点击"启动"->点击"service-global.getVersion"
      <br />cg_*** 扩展服务API;
      <br />sg_*** 底层硬件API.
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount, onMounted } from 'vue'
import LinkClient from 'link-client'; //测试npm包
//import LinkChannel from '../lib/link-node/index'; // 直接测试代码

export default {
  name: 'Link-Client',
  props: {
    msg: String
  },
  data() {
    return {
      count: 10
    }
  },
  methods: {
    clear() {
      document.getElementById("msgOutput").innerHTML = '';
    },

    showLog(v) {
      if (typeof v === "object") {
        v = JSON.stringify(v);
      }
      let date = new Date();
      let pre = "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] ";
      v = pre + v;
      console.log("log:", v);
      let outMsg = document.getElementById("msgOutput");
      outMsg.innerHTML = v + "<br>" + outMsg.innerHTML;
    },

    callBack(v) {
      //console.log("<Vue3>:call back::", v);
      if (typeof v === "object") {
        this.showLog("[cb]" + JSON.stringify(v));
      } else this.showLog("[cb]" + (v));
    },
    _handle(v) {
      //console.log("<Vue3>:call back::", v);
      if (typeof v === "object") {
        this.showLog("[back]" + JSON.stringify(v));
      } else this.showLog("[back]" + (v));
    },
    _handleSend(v) {
      //console.log("<Vue3>:call back::", v);
      if (typeof v === "object") {
        this.showLog("[sendH]" + JSON.stringify(v));
      } else this.showLog("[sendH]" + (v));
    },

    start(event) {
      console.log("start", event);
      let ip = document.getElementById("inIP").value
      let port = parseInt(document.getElementById("inPort").value);
      this.client.init(ip, port);//( "localhost",52384);
      this.client.setHandle(this._handle); //非必要
      this.client.channel.handleSend = this._handleSend; //非必要
      this.showLog("----start----");
    },

    close(event) {
      console.log("close", event);
      if (this.client) this.client.close();
    },
    refresh() {
      if (this.client){
        this.client.refresh();
        this.client.setHandle(this._handle); //非必要
        this.client.channel.handleSend = this._handleSend; //非必要
      }
    },

    cg_getVersion() {
      let sv = this.client.getExtension("client-global"); //("discovery");//
      console.log("sv.version::", sv.getVersion());
    },
    cg_init() {
      let sv = this.client.getExtension("client-global");
      let res = sv.init("");
      console.log("sv.version::", res);
    },
    sg_getVersion() {
      let sv = this.client.getService("service-global");
      console.log("sv.version::", sv.getVersion());
    },
    sg_init() {
      let sv = this.client.getService("service-global");
      let res = sv.init("");
      console.log("sv.version::", res);
    },
    sg_askAndAnswer() {
      let sv = this.client.getService("service-global");
      let res = sv.askAndAnswer("liam", this.callBack);
      console.log("sv.askAndAnswer::", res);
    },
    sg_listen() {
      let sv = this.client.getService("service-global");
      let res = sv.listen(this.callBack, 3, 10);
      console.log("sv.askAndAnswer::", res);
    },
    sg_close() {
      let sv = this.client.getService("service-global");
      let res = sv.close();
      console.log("sv.close::", res);
    },
    sendButton() {
      var v = document.getElementById("msgInput").value;
      this.sendData(JSON.parse(v));
    },
    sendData(data) {
      let r = data;
      let result = this.client.channel.send(r.method, r.params, r.service,r.id);
      console.log('result::', result);
    },
  },

  setup() {
    console.log("-------------------------setup:");
    const message = "hello aa!";
    let client = new LinkClient(false);
    const db = {};

    let inputMsg = document.getElementById("msgInput");
    let outMsg = document.getElementById("msgOutput");

    onMounted(() => {
      console.log("run:onMounted link-client")
    })

    return { message, client, db, inputMsg, outMsg };
  }
}
</script>

<style>
button {
  font-size: 14px;
  margin: 4px 6px;
}
.envBox span {
  padding-left: 6px;
  font-size: 14;
  color: red;
}
.buttonBox {
  float: left;
  clear: both;
  margin-bottom: 10px;
}

.buttonBox button {
  float: left;
  line-height: 150%;
}
body {
  font-size: 12px;
}
h1 {
  margin: 4px;
  padding: 2px;
}

.OutBox {
  overflow-y: scroll;
  width: 90%;
  height: 250px;
  border: dashed red;
  float: left;
  clear: both;
}
.InBox {
  float: left;
  width: 90%;
  height: 80px;
  border: dashed rgb(0, 255, 85);
  clear: both;
}
.InOutBox {
  margin-top: 10px;
}
.InOutBox div {
  clear: both;
  text-align: left;
  margin-top: 10px;
}
.pcConfig {
  clear: both;
  float: left;
  margin: 10px 0;
  font-size: 12px;
}
.pcConfig input {
  width: 60px;
  margin-right: 2px;
  font-size: 12px;
}
</style>
