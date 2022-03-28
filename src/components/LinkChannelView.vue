<template>
  <h1>link-test-demo</h1>
  <div class="envBox"></div>
  <div class="buttonBox">
    <button @click="start">启动</button>
    <button @click="close">停止</button>
    <button @click="sendData(this.db.getVersion)">sg.getVersion</button>
    <button @click="sendData(this.db.init)">sg.init</button>
    <button @click="sendData(this.db.askAndAnswer)">sg.askAndAnswer</button>
    <button @click="sendData(this.db.listen)">sg.listen</button>
    <button @click="sendData(this.db.close)">sg.close</button>
    <button @click="clear">清空日志</button>
  </div>
  <div class="pcConfig">
    平台:<input id="inPlatform" value="auto" />
    pcIp:<input id="inIP" value="localhost" />
    port:<input id="inPort" value="52384" />
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
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount, onMounted } from 'vue'
import LinkChannel from 'link-node'; //测试npm包
//import LinkChannel from '../lib/link-node/index'; // 直接测试代码

export default {
  name: 'LinkChannel',
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
        this.showLog("[back]" + JSON.stringify(v));
      } else this.showLog("[back]" + (v));
    },

    start(event) {
      console.log("start", event);
      this.channel.setHandle(this.callBack);
      this.channel.Config.platform = document.getElementById("inPlatform").value;
      this.channel.Config.PC.port = parseInt(document.getElementById("inPort").value);
      this.channel.Config.PC.host = document.getElementById("inIP").value;
      this.channel.init();
      this.showLog("----start----");
    },

    close(event) {
      console.log("close", event);
      this.channel.close();
    },
    sendButton() {
      var v = document.getElementById("msgInput").value;
      this.sendData(JSON.parse(v));
    },
    sendData(data) {
      //console.log("client getServiceHello:", event);
      if (typeof data === "object") {
        this.showLog("[send]" + JSON.stringify(data));
      } else this.showLog("[send]" + (data));
      let r = data;
      //{ "jsonrpc": "2.0", "method": "say", "params": ["liam"], "id": 199, "service": "hello-world" };
      let result = this.channel.send(r.method, r.params, r.service);
      console.log('result::', result);
    },
  },
  setup() {
    console.log("-------------------------setup:");
    const message = "hello aa!";
    const channel = new LinkChannel(false);//(52384, "localhost");
    const db = {};

    const loadData = () => {
      db.getVersion = { "jsonrpc": "2.0", "method": "getVersion", "params": [""], "id": 199, "service": "service-global" };
      db.init = { "jsonrpc": "2.0", "method": "init", "params": ["{}"], "id": 299, "service": "service-global" };
      db.askAndAnswer = { "jsonrpc": "2.0", "method": "askAndAnswer", "params": ["liam", { "type": "JSON_RPC_CALLBACK", "id": 188 }], "id": 399, "service": "service-global" };
      db.listen = { "jsonrpc": "2.0", "method": "listen", "params": [{ "type": "JSON_RPC_CALLBACK", "id": 288 }, 5, 500], "id": 499, "service": "service-global" };
      db.close = { "jsonrpc": "2.0", "method": "close", "params": [""], "id": 699, "service": "service-global" };
    }

    let inputMsg = document.getElementById("msgInput");
    let outMsg = document.getElementById("msgOutput");

    onMounted(() => {
      console.log("run:onMounted link-channel")
      //loadServer();
      loadData();
    })

    return { message, channel, db, inputMsg, outMsg };
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
