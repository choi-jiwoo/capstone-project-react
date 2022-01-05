/*global kakao*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

function Gpx() {
  const location = useLocation();
  const courseName = location.state.courseName;
  const { kakao } = window;
  const [info, setInfo] = useState('');

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
    const size = new kakao.maps.Size(50, 45),
      option = {
        offset: new kakao.maps.Point(15, 43),
      };

    const image = new kakao.maps.MarkerImage(imgSrc, size, option);

    const marker = new kakao.maps.Marker({
      map: map,
      position: position,
      image: image,
    });
  };

  const moveFocus = (linePath, map, middle, startPosition, arrivePosition) => {
    const points = [startPosition, arrivePosition];
    const bounds = new kakao.maps.LatLngBounds();
    points.forEach((element) => {
      bounds.extend(element);
    });
    map.setBounds(bounds, 100, 100);

    const moveLatLon = new kakao.maps.LatLng(
      linePath[middle].Ma,
      linePath[middle].La
    );
    map.setCenter(moveLatLon);

    // 지도 1단계 줌아웃
    // const level = map.getLevel();
    // map.setLevel(level + 1);
  };

  // 분명 개선의 여지가 있을것
  const requestDurunubi = (map) => {
    const params = {
      serviceKey: apiKey,
      pageNo: 1,
      numOfRows: 1,
      MobileOS: 'ETC',
      MobileApp: 'togetherJeju',
      crsKorNm: courseName,
      brdDiv: 'DNWW',
    };

    return axios
      .get(baseUrl, {
        params: params,
      })
      .then((response) => response.data.response.body.items.item);
  };

  const getInfo = () => {
    requestDurunubi().then((info) => {
      const data = {
        name: info.crsKorNm.split('<br>'),
        type: info.crsCycle.split('<br>'),
        tour: info.crsTourInfo.split('<br>'),
        summary: info.crsSummary.split('<br>'),
        contents: info.crsContents.split('<br>'),
        travelInfo: info.travelerinfo.split('<br>'),
      };

      setInfo(data);
    });
  };

  const getGpx = () => {
    return requestDurunubi()
      .then((info) => axios.get(info.gpxpath).then((response) => response.data))
      .then((gpx) => new XMLParser().parseFromString(gpx));
  };

  const downloadGpx = () => {
    saveAs(info.gpxpath, 'gpxpath.gpx');
  };

  const searchCourse = (map) => {
    getGpx()
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

  const text = (data) =>
    data ? data.map((element) => <p key={element}>{element}</p>) : null;

  useEffect(() => {
    // setting map
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: baseMap,
        level: 9,
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    getInfo();
    searchCourse(map);
  }, []);

  return (
    <div className='container-xl '>
      <div className='Btn text-xl text-gray-400 pt-10'>
        <Link to='/plogging'>
          <span className='hover:text-green-500'>&lt; 뒤로가기</span>
        </Link>
      </div>
      <div className='flex flex-row'>
        <div>
          <div
            className='mt-10'
            id='map'
            style={{ width: '600px', height: '600px' }}
          ></div>
        </div>
        <div className='flex flex-col m-10'>
          <div className='text-3xl font-bold pb-10'>{info.name}</div>
          <div className='courseDesc text-lg flex flex-col space-y-4 pb-10'>
            <div>
              <p className='hdr'>코스 형태</p>
              {info.type}
            </div>
            <div>
              <p className='hdr'>관광 포인트</p>
              {text(info.tour)}
            </div>
            <div>
              <p className='hdr'>코스 개요</p>
              {text(info.summary)}
            </div>
            <div>
              <p className='hdr'>코스 설명</p>
              {text(info.contents)}
            </div>
            <div>
              <p className='hdr'>여행자 정보</p>
              {text(info.travelInfo)}
            </div>
          </div>
          <button
            className='btn btn-outline-success p-2 text-sm justify-self-start'
            onClick={downloadGpx}
          >
            GPX 트랙 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gpx;
