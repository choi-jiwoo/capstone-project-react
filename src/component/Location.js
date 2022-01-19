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
          infoWindow.close();
        });
        resultList[i].onclick = function () {
          displayInfoWindow(kakaomap, marker, infoWindow, data);
        };
      })(marker, data[i], i);

      if (!bounds.isEmpty()) kakaomap.setBounds(bounds);
    }
  }, [list]);

  const setInfoWindowContent = (infoWindow, storeInfo) => {
    const infoWindowElement = `<div class="infoWindow">
                              <div class="info flex flex-col break-all">
                                  <div class="flex flex-row justify-between border-b h-10">
                                  <div class="font-bold text-lg">${storeInfo.store}</div>
                                  </div>
                                  <div class="flex flex-col whitespace-normal">
                                  <p>위치<br />${storeInfo.addr}</p>
                                  <p>번호<br />${storeInfo.tel}</p>
                                  <p>
                                      홈페이지<br /><a
                                      class="hover:text-green-400"
                                      href="${storeInfo.homepage}"
                                      target="_blank"
                                      >${storeInfo.homepage}</a>
                                  </p>
                                  </div>
                              </div>
                              </div>`;
    infoWindow.setContent(infoWindowElement);
  };

  const checkContentExist = (content) => {
    if (content !== null) return content;
    else return '';
  };

  const displayInfoWindow = (kakaomap, marker, infoWindow, storeInfo) => {
    setInfoWindowContent(infoWindow, storeInfo);
    infoWindow.open(kakaomap, marker);

    const infoWindowElement = document.getElementsByClassName('infoWindow')[0];
    infoWindowElement.parentNode.previousSibling.style.marginTop = '-3px'; // content박스와 세모박스와 연결이 끊기는걸 이어줌

    const pos = marker.getPosition();
    kakaomap.panTo(pos);
  };

  const getData = (item) => {
    for (const [key, value] of Object.entries(item)) {
      item[key] = checkContentExist(value);
    }

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
