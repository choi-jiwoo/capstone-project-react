/*global kakao*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { useLocation, Link } from 'react-router-dom';
import { saveAs } from 'file-saver';

function Gpx() {
  const location = useLocation();
  const courseName = location.state.courseName;
  const { kakao } = window;
  const [courseInfo, setCourseInfo] = useState({});
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

  const moveFocus = (map, linePath) => {
    const bounds = new kakao.maps.LatLngBounds();
    for (let i = 0; i < linePath.length; i++) {
      bounds.extend(linePath[i]);
    }
    map.setBounds(bounds);
  };

  const requestDurunubi = () => {
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
      .then((response) => response.data.response.body.items.item)
      .catch(() => {
        alert('Service not available as of now.');
        window.location.href = 'http://localhost:3000/plogging';
      });
  };

  const getInfo = () => {
    return requestDurunubi()
      .then((info) => {
        const data = {
          name: info.crsKorNm,
          type: info.crsCycle,
          tour: info.crsTourInfo.split('<br>'),
          summary: info.crsSummary.split('<br>'),
          contents: info.crsContents.split('<br>'),
          travelInfo: info.travelerinfo.split('<br>'),
          gpxPath: info.gpxpath,
        };
        setCourseInfo(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadGpx = () => {
    saveAs(courseInfo.gpxPath, `${courseName}.gpx`);
  };

  const searchCourse = (map) => {
    getInfo().then((info) =>
      axios
        .get(info.gpxPath)
        .then((gpxFile) => gpxFile.data)
        .then((gpx) => new XMLParser().parseFromString(gpx))
        .then((xml) => xml.getElementsByTagName('trkseg')[0])
        .then((trkseg) => {
          const trksegData = trkseg.children;
          const courseLength = trksegData.length;
          var linePath = [];

          trksegData.forEach((element) => {
            const lat = element.attributes.lat;
            const lon = element.attributes.lon;
            const pos = new kakao.maps.LatLng(lat, lon);
            linePath.push(pos);
          });
          drawPath(linePath, map);

          const startPosition = linePath[0];
          const startImgSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png';
          drawFlag(startPosition, map, startImgSrc);

          const arrivePosition = linePath[courseLength - 1];
          const arriveImgSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png';
          drawFlag(arrivePosition, map, arriveImgSrc);

          moveFocus(map, linePath);
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  const text = (data) =>
    data ? data.map((element) => <p key={element}>{element}</p>) : null;

  useEffect(() => {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: baseMap,
        level: 9,
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
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
          <div className='text-3xl font-bold pb-10'>{courseInfo.name}</div>
          <div className='courseDesc text-lg flex flex-col space-y-4 pb-10'>
            <div>
              <p className='hdr'>코스 형태</p>
              {courseInfo.type}
            </div>
            <div>
              <p className='hdr'>관광 포인트</p>
              {text(courseInfo.tour)}
            </div>
            <div>
              <p className='hdr'>코스 개요</p>
              {text(courseInfo.summary)}
            </div>
            <div>
              <p className='hdr'>코스 설명</p>
              {text(courseInfo.contents)}
            </div>
            <div>
              <p className='hdr'>여행자 정보</p>
              {text(courseInfo.travelInfo)}
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
