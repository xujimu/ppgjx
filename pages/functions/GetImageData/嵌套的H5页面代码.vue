<!-- 
	2021/8/20
	WIsh
	i@itsse.cn
-->
<template>
  <div class="home">
    <van-uploader v-if="!ifUpImg" :after-read="upImg">
      <van-button icon="plus" type="primary">上传照片</van-button>
    </van-uploader>
    <van-button v-else icon="plus" @click="reloadUrl" type="primary"
      >上传照片</van-button
    >
    <div class="showimg">
      <img ref="img" :src="imgurl" alt="" />
    </div>
    <div class="main" v-if="show">
      <div class="main-title">-图片信息-</div>
      <div class="main-item">
        <div class="main-text">名称: {{ imgData.name }}</div>
        <div class="main-text">大小: {{ imgData.size.toFixed(1) }} MB</div>
      </div>
      <div class="main-item">
        <div class="main-text">专辑:</div>
        <div class="main-text">制造商: {{ imgData.phone }}</div>
        <div class="main-text">型号: {{ imgData.phoneModel }}</div>
      </div>
      <div class="main-item">
        <div class="main-text">位置信息:</div>
        <div class="main-text">X: {{ imgData.location.x }}</div>
        <div class="main-text">Y: {{ imgData.location.y }}</div>
        <div class="main-text">
          {{ imgData.location.name }}
        </div>
      </div>
      <div class="main-item">
        <div class="main-text">
          宽 x 高: {{ imgData.width }} x {{ imgData.height }}
        </div>
      </div>
      <div class="main-item">
        <div class="main-text">拍摄时间: {{ imgData.ctime }}</div>
      </div>
    </div>
    <div class="tips">该工具没有上传图片功能</div>
  </div>
</template>

<script>
import { Toast } from "vant";
import EXIF from "exif-js";
export default {
  data() {
    return {
      show: false,
      ifUpImg: false, // 有没有上传图片
      imgurl: "",
      imgData: {
        width: "",
        height: "",
        name: "", // 名称
        size: "", // 大小
        trifle: "", // 尺寸
        phone: "", // 手机
        phoneModel: "", // 手机型号
        ctime: "", // 创建时间
        location: {
          //位置信息
          name: "", // 位置
          x: "",
          y: "",
        },
      },
    };
  },
  created() {},
  methods: {
    reloadUrl() {
      Toast("请重新点击上传");
      location.reload();
    },
    upImg(file) {
      this.imgurl = file.content;
      this.imgData.name = file.file.name;
      this.imgData.size = file.file.size / 1000 / 1000;
      this.ifUpImg = true;
      Toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      setTimeout(() => {
        this.getImgData();
      }, 1000);
      return false;
    },
    getImgData() {
      let _this = this;
      EXIF.getData(_this.$refs.img, function () {
        //图片包含的所有信息(例：拍照方向、相机设备型号、拍摄时间、ISO 感光度、GPS 地理位置等数据。)
        let imgAllInfo = EXIF.getAllTags(this);
        // console.log(imgAllInfo);
        // 创建时间
        _this.imgData.ctime = imgAllInfo.DateTime;
        // 手机
        _this.imgData.phone = imgAllInfo.Make;
        // 手机型号
        _this.imgData.phoneModel = imgAllInfo.Model;
        // 宽
        _this.imgData.width = imgAllInfo.PixelYDimension;
        // 高
        _this.imgData.height = imgAllInfo.PixelXDimension;
        let imgLon = EXIF.getTag(this, "GPSLongitude");
        let imgLat = EXIF.getTag(this, "GPSLatitude");
        if (imgLon && imgLat) {
          //计算出经纬度并保留6为小数
          const lon = (
            imgLon[0] +
            imgLon[1] / 60 +
            imgLon[2] / 60 / 60
          ).toFixed(6);
          const lat = (
            imgLat[0] +
            imgLat[1] / 60 +
            imgLat[2] / 60 / 60
          ).toFixed(6);
          //使用高德地图的逆地理编码，key申请类型为Web API服务
          _this.imgData.location.y = lat;
          _this.imgData.location.x = lon;
          // console.log(_this.imgData);
          _this.$http
            .post("https://ppgjx.com/functions/ImageLocation/get", {
              location: `${lon},${lat}`,
            })
            .then((res) => {
              // console.log(res);
              _this.show = true;
              Toast.clear();
              if (res.data.code == 0) {
                _this.imgData.location.name =
                  res.data.data.regeocode.formatted_address;
              } else {
                _this.imgData.location.name = "获取位置信息失败!";
              }
            });
        } else {
          Toast.clear();
          _this.show = true;
          _this.imgData.location.name = "暂未获得该图片地址";
          console.log("暂未获得该图片地址");
        }
      });
    },
  },
};
</script>

<style scoped>
.home {
  padding-top: 20px;
}
.showimg {
  padding: 0 15px;
  margin-top: 20px;
}
.showimg img {
  max-width: 100%;
}
.tips {
  text-align: center;
  color: #ccc;
}
.main {
  padding: 35px 50px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 23px 0px rgba(86, 168, 210, 0.28);
  margin: 20px 0;
}

.main-title {
  font-size: 18px;
}

.main-item {
  margin-top: 20px;
  font-size: 16px;
}

.main-text {
  margin-top: 2px;
}
</style>