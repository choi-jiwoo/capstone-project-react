/*global kakao*/
import React, { useEffect } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';

function Gpx() {
  // 제일 먼저 두루누비에서 gpx 파일 불러오는 로직을 먼저 짜야함
  const testGpxPath =
    'https://www.durunubi.kr/editImgUp.do?filePath=/data/koreamobility/course/summap/T_CRS_MNG0000005461.gpx';

  const { kakao } = window;
  const baseMap = new kakao.maps.LatLng(33.385323, 126.551464);

  const printRoute = (map) => {
    var linePath = [];
    axios.get(testGpxPath).then(function (response) {
      const xml = new XMLParser().parseFromString(response.data);
      const trkseq = xml.getElementsByTagName('trkseq')[0];
      const trkseqData = trkseq.children;
      const courseLength = trkseqData.length;
      const middle = parseInt(courseLength / 2);

      trkseqData.forEach((element) => {
        const lat = element.attributes.lat;
        const lon = element.attributes.lon;
        const pos = new kakao.maps.LatLng(lat, lon);
        linePath.push(pos);
      });

      // 경로 그리기
      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#ff0000',
        strokeOpacity: 1,
        strokeStyle: 'solid',
      });

      polyline.setMap(map);

      // 지도 위치 변경
      const moveLatLon = new kakao.maps.LatLng(
        linePath[middle].Ma,
        linePath[middle].La
      );
      map.setCenter(moveLatLon);

      // 지도 포커스 설정
      const points = [linePath[0], linePath[courseLength - 1]];
      const bounds = new kakao.maps.LatLngBounds();
      points.forEach((element) => {
        bounds.extend(element);
      });
      map.setBounds(bounds);
    });
  };

  useEffect(() => {
    // setting map
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: baseMap,
        level: 9,
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    printRoute(map);
  }, []);
  return <div id='map' style={{ width: '700px', height: '500px' }}></div>;
}

export default Gpx;
