import React from 'react';
import Card from './Card';
import place_recommend_1 from '../asset/place_recommend_1.jpg';
import place_recommend_2 from '../asset/place_recommend_2.jpg';
import place_recommend_3 from '../asset/place_recommend_3.jpg';
import travel_recommend_1 from '../asset/travel_recommend_1.jpg';
import travel_recommend_2 from '../asset/travel_recommend_2.jpg';
import travel_recommend_3 from '../asset/travel_recommend_3.jpg';

function HomeContent() {
  return (
    <>
      <div className='container-xl'>
        <div className='mainContent'>
          <div className='mainContentList'>
            <div className='mainContentHeader'>이런 곳은 어떤가요?</div>
            <div className='mainContentItemList'>
              <Card
                place={place_recommend_1}
                alt={
                  'img_source: https://m.place.naver.com/my/review/6155ab3c49cb69a979543d9a?v=2'
                }
                name={'귀덕향사'}
                about={'제주 서쪽 귀덕마을의 맛있는 이야기.'}
                link={'http://naver.me/GmF3Vu1T'}
              />
              <Card
                place={place_recommend_2}
                alt={'img_source: https://blog.naver.com/zzoraman/222414908964'}
                name={'당근과깻잎'}
                about={`<당근과깻잎>은 제주 구좌 지역에서 친환경 농산물을 생산하는 제주농부들이 함께 참여하여 만든 
제주동뜨락협동조합에서 운영하는 친환경 제주당근카페 입니다.
카페는 제주시 구좌읍 평대리에 자리 잡고 있으며,
당근 카페에는 당근밭이 함께 있어 6월~7월에는 당근꽃을 볼 수 있고,
8월~12월 까지는 당근의 농사 과정을 직접 볼 수 있으면 겨울에는 당근뽑기 체험도 할 수 있습니다. 
카페의 넓은 뒷마당과 온실에는 지역에서 생산되는 각종 토종 농산물과 꽃들이 심어져 있어
카페 속에서도 제주의 작은자연을 누릴 수 있습니다
유기농농산물을 생산하는 농부들이 참여하여 만든 카페이니 만큼,
카페에서 사용되는 식자재는 가장 건강하고 친환경적인 농산물만 사용됩니다. 
고급 원두를 직접 로스팅하여 제공하는 다양한 커피는
유기농당근주스 못지 않게 맛있는 카페의 대표 음료 입니다`}
                link={'http://naver.me/5Y1wVqBC'}
              />
              <Card
                place={place_recommend_3}
                alt={'img_source: https://blog.naver.com/oroginal/222543797360'}
                name={'한남307'}
                about={
                  '서귀포시 남원읍 한남리에 위치한 정원과 감귤밭이 공존하는 감귤 창고 카페입니다.\n(한남307 유래는 구 주소인 한남리307-3에서 따온 이름입니다)'
                }
                link={'http://naver.me/FU3yONSb'}
              />
            </div>
          </div>
        </div>
        <div className='mainContent'>
          <div className='mainContentList'>
            <div className='mainContentHeader'>다양한 여행을 경험해보세요</div>
            <div className='mainContentItemList'>
              <Card
                place={travel_recommend_1}
                alt={
                  'img_source: https://booking.naver.com/booking/12/bizes/502554'
                }
                name={'최남단체험감귤농장'}
                about={'365일 가능한 감귤따기 체험과 농촌생태체험'}
                link={'https://booking.naver.com/booking/12/bizes/502554'}
              />
              <Card
                place={travel_recommend_2}
                alt={
                  'img_source: http://www.jejuolle.org/trail/kor/olle_trail/default.asp?search_idx=4'
                }
                name={'제주 올레길 3코스'}
                about={`중산간 길의 고즈넉함을 만끽할 수 있는 올레. 양옆에 늘어선 오래된 제주 돌담과 제주에 자생하는 울창한 수목이 운치를 더한다. 나지막하면서 독특한 전망, 통오름과 독자봉이 제주의 오름이 지닌 고유의 멋을 느끼게 해준다. 동백나무길, 감귤밭길 등 삼달리 중산간길이 이어지고 김영갑갤러리 두모악이 나온다. 병마에 시달린 마지막까지도 아름다운 제주의 사진을 찍어냈던 고 김영갑 사진작가의 작품을 만날 수 있다.`}
                link={
                  'http://www.jejuolle.org/trail/kor/olle_trail/default.asp?search_idx=4'
                }
              />
              <Card
                place={travel_recommend_3}
                alt={'img_source: '}
                name={'제주 유채꽃 축제'}
                about={`제주도의 대표적인 봄꽃을 꼽으라면 유채꽃이 빠질 수 없다. 제주에서도 특히 더 따뜻한 남부지역에선 늦겨울부터 꽃을 피워 봄 내내 샛노란 자태를 뽐낸다. 제주 전역에서 흔히 볼 수 있는 유채꽃은 1960년대부터 본격적으로 재배되었다고 알려져 있다. 추위와 습기에 강하고 빨리 자라는 습성이 있어 척박한 제주 땅에 잘 맞는 까닭에서다.`}
                link={
                  'https://www.visitjeju.net/kr/detail/view?contentsid=CNTS_000000000021934'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeContent;
