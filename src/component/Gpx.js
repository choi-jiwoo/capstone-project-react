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

      // 출발 마커 표시
      const startPosition = linePath[0];
      var startSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png', // 출발 마커이미지의 주소입니다
        startSize = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
        startOption = {
          offset: new kakao.maps.Point(15, 43), // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
        };

      // 출발 마커 이미지를 생성합니다
      var startImage = new kakao.maps.MarkerImage(
        startSrc,
        startSize,
        startOption
      );

      // 출발 마커를 생성합니다
      var startMarker = new kakao.maps.Marker({
        map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
        position: startPosition,
        image: startImage, // 출발 마커이미지를 설정합니다
      });

      // 도착 마커 표시
      const arrivePosition = linePath[courseLength - 1];
      var arriveSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png', // 도착 마커이미지 주소입니다
        arriveSize = new kakao.maps.Size(50, 45), // 도착 마커이미지의 크기입니다
        arriveOption = {
          offset: new kakao.maps.Point(15, 43), // 도착 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
        };

      var arriveImage = new kakao.maps.MarkerImage(
        arriveSrc,
        arriveSize,
        arriveOption
      );

      // 도착 마커를 생성합니다
      var arriveMarker = new kakao.maps.Marker({
        map: map, // 도착 마커가 지도 위에 표시되도록 설정합니다
        position: arrivePosition,
        image: arriveImage, // 도착 마커이미지를 설정합니다
      });

      // 지도 위치 변경
      const moveLatLon = new kakao.maps.LatLng(
        linePath[middle].Ma,
        linePath[middle].La
      );
      map.setCenter(moveLatLon);

      // 지도 포커스 설정
      const points = [startPosition, arrivePosition];
      const bounds = new kakao.maps.LatLngBounds();
      points.forEach((element) => {
        bounds.extend(element);
      });
      map.setBounds(bounds);

      // 지도 1단계 줌아웃
      const level = map.getLevel();
      map.setLevel(level + 1);
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
