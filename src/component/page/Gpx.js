/*global kakao*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { useLocation } from 'react-router-dom';

function Gpx() {
  const location = useLocation();
  const courseName = location.state.courseName;
  const { kakao } = window;
  const [downloadLink, setDownloadLink] = useState('');
  const baseUrl =
    'http://api.visitkorea.or.kr/openapi/service/rest/Durunubi/courseList?';
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseMap = new kakao.maps.LatLng(33.385323, 126.551464);

  const drawPath = (linePath, map) => {
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: '#ff0000',
      strokeOpacity: 1,
      strokeStyle: 'solid',
    });

    polyline.setMap(map);
  };

  const drawFlag = (linePath, map, imgSrc) => {
    const position = linePath;
    const size = new kakao.maps.Size(50, 45), // 출발 마커이미지의 크기입니다
      option = {
        offset: new kakao.maps.Point(15, 43), // 출발 마커이미지에서 마커의 좌표에 일치시킬 좌표를 설정합니다 (기본값은 이미지의 가운데 아래입니다)
      };

    // 출발 마커 이미지를 생성합니다
    const image = new kakao.maps.MarkerImage(imgSrc, size, option);

    // 출발 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map: map, // 출발 마커가 지도 위에 표시되도록 설정합니다
      position: position,
      image: image, // 출발 마커이미지를 설정합니다
    });
  };

  const moveFocus = (linePath, map, middle, startPosition, arrivePosition) => {
    // 지도 포커스 설정
    const points = [startPosition, arrivePosition];
    const bounds = new kakao.maps.LatLngBounds();
    points.forEach((element) => {
      bounds.extend(element);
    });
    map.setBounds(bounds);

    // 지도 위치 변경
    const moveLatLon = new kakao.maps.LatLng(
      linePath[middle].Ma,
      linePath[middle].La
    );
    // map.setCenter(moveLatLon);
    map.panTo(moveLatLon);

    // 지도 1단계 줌아웃
    // const level = map.getLevel();
    // map.setLevel(level + 1);
  };

  const getDownloadLink = () => {
    // 파일명이 다른 기준으로 되어있음..
    searchCourse().then((info) => {
      setDownloadLink(
        'https://www.durunubi.kr/download?filePath=/data/koreamobility/course/summap/' +
          info.crsIdx +
          '.gpx&downloadName=' +
          courseName +
          '.gpx&device=WEB&course_id=' +
          info.crsIdx
      );
    });
  };

  // 분명 개선의 여지가 있을것
  const searchCourse = (map) => {
    const params = {
      serviceKey: apiKey,
      pageNo: 1,
      numOfRows: 1,
      MobileOS: 'ETC',
      MobileApp: 'togetherJeju',
      crsKorNm: courseName,
      brdDiv: 'DNWW',
    };

    axios
      .get(baseUrl, {
        params: params,
      })
      .then((response) => response.data.response.body.items.item)
      .then((info) => axios.get(info.gpxpath).then((response) => response.data))
      .then((gpx) => new XMLParser().parseFromString(gpx))
      .then((xml) => xml.getElementsByTagName('trkseg')[0])
      .then((trkseg) => {
        const trksegData = trkseg.children;
        const courseLength = trksegData.length;
        const middle = parseInt(courseLength / 2);
        var linePath = [];

        trksegData.forEach((element) => {
          const lat = element.attributes.lat;
          const lon = element.attributes.lon;
          const pos = new kakao.maps.LatLng(lat, lon);
          linePath.push(pos);
        });
        // 경로 그리기
        drawPath(linePath, map);

        // 출발 마커 표시
        const startPosition = linePath[0];
        const startImgSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png';
        drawFlag(startPosition, map, startImgSrc);

        // 도착 마커 표시
        const arrivePosition = linePath[courseLength - 1];
        const arriveImgSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png';
        drawFlag(arrivePosition, map, arriveImgSrc);

        // 지도 이동
        moveFocus(linePath, map, middle, startPosition, arrivePosition);
      });
  };

  useEffect(() => {
    // setting map
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: baseMap,
        level: 9,
      };
    var map = new kakao.maps.Map(mapContainer, mapOption);
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    searchCourse(map);
  }, []);

  return (
    <>
      <div>
        <a
          href={downloadLink}
          className='btn btn-outline-success p-2'
          role='button'
        >
          GPX 트랙 다운로드
        </a>
      </div>
      <div id='map' style={{ width: '700px', height: '500px' }}></div>
    </>
  );
}

export default Gpx;
