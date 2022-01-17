/*global kakao*/
import React, { useEffect, useState } from 'react';

const Location = ({ list }) => {
  const { kakao } = window;
  const baseMap = new kakao.maps.LatLng(33.385323, 126.551464);
  const [kakaomap, setKakaomap] = useState(null);
  const [markerArr, setMarkerArr] = useState([]);
  const [infoWindow, setInfoWindow] = useState(
    new kakao.maps.InfoWindow({
      removable: true,
    })
  );

  useEffect(() => {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: baseMap,
        level: 9,
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setKakaomap(map);
  }, []);

  useEffect(() => {
    infoWindow.setMap(null);
    infoWindow.length = 0;

    for (let i = 0; i < markerArr.length; i++) markerArr[i].setMap(null);
    markerArr.length = 0;

    let bounds = new kakao.maps.LatLngBounds();

    const data = list.map((item) => getData(item));
    const resultList = document.getElementsByClassName('searchResultList');

    for (let i = 0; i < data.length; i++) {
      const marker = new kakao.maps.Marker({
        map: kakaomap,
        position: data[i].postition,
      });
      markerArr.push(marker);
      marker.setMap(kakaomap);
      bounds.extend(data[i].postition);

      // events
      (function attachInfoWindow(marker, data, i) {
        kakao.maps.event.addListener(marker, 'click', function () {
          displayInfoWindow(kakaomap, marker, infoWindow, data);
        });

        kakao.maps.event.addListener(kakaomap, 'click', function () {
          infoWindow.setMap(null);
        });
        resultList[i].onclick = function () {
          displayInfoWindow(kakaomap, marker, infoWindow, data);
        };
      })(marker, data[i], i);

      if (!bounds.isEmpty()) kakaomap.setBounds(bounds);
    }
  }, [list]);

  const setInfoWindowContent = (infoWindow, storeInfo) => {
    let infoText = '';
    var content = document.createElement('div');
    content.className = 'infoWindow';
    var info = document.createElement('div');
    info.className = 'info flex flex-col break-all';
    content.appendChild(info);

    var header = document.createElement('div');
    header.className = 'flex flex-row justify-between border-b h-10';
    info.appendChild(header);

    var title = document.createElement('div');
    title.className = 'font-bold text-lg';
    infoText = checkContentExist(storeInfo.store);
    title.appendChild(document.createTextNode(infoText));
    header.appendChild(title);

    var desc = document.createElement('div');
    desc.className = 'flex flex-col whitespace-normal';
    info.appendChild(desc);

    var addr = document.createElement('p');
    addr.appendChild(document.createTextNode('위치'));
    addr.appendChild(document.createElement('br'));
    infoText = checkContentExist(storeInfo.addr);
    addr.appendChild(document.createTextNode(infoText));
    desc.appendChild(addr);

    var tel = document.createElement('p');
    tel.appendChild(document.createTextNode('번호'));
    tel.appendChild(document.createElement('br'));
    infoText = checkContentExist(storeInfo.tel);
    tel.appendChild(document.createTextNode(infoText));
    desc.appendChild(tel);

    var homepage = document.createElement('p');
    homepage.appendChild(document.createTextNode('홈페이지'));
    homepage.appendChild(document.createElement('br'));
    desc.appendChild(homepage);

    var homepageLink = document.createElement('a');
    homepageLink.className = 'hover:text-green-400';
    homepageLink.setAttribute('href', storeInfo.homepage);
    homepageLink.setAttribute('target', '_blank');
    infoText = checkContentExist(storeInfo.homepage);
    homepageLink.appendChild(document.createTextNode(infoText));
    homepage.appendChild(homepageLink);

    infoWindow.setContent(content);

    return content;
  };

  const checkContentExist = (content) => {
    if (content !== null) return content;
    else return '';
  };

  const displayInfoWindow = (kakaomap, marker, infoWindow, storeInfo) => {
    const content = setInfoWindowContent(infoWindow, storeInfo);
    const pos = marker.getPosition();
    content.parentNode.previousSibling.style.marginTop = '-3px'; // content박스와 세모박스와 연결이 끊기는걸 이어줌
    infoWindow.open(kakaomap, marker);
    kakaomap.panTo(pos);
  };

  const getData = (item) => {
    const individual = {
      thumbnail: item.thum_url,
      store: item.store,
      reviewcount: item.review_count,
      category: item.category,
      tel: item.tel,
      addr: item.address,
      homepage: item.homepage,
      postition: new kakao.maps.LatLng(item.x, item.y),
    };

    return individual;
  };

  return (
    <div className='map_wrap'>
      <div
        id='map'
        style={{
          width: '100%',
          height: '100%',
        }}
      ></div>
    </div>
  );
};
export default Location;
