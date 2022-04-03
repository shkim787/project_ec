/*global kakao*/
import React, { useState, useEffect } from "react";

const KakaoMap = ({detailData}) => {
  
  useEffect(() => {
    generateMap()    
  }, []);
  
  const generateMap = () => {
    const container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(36.38, 127.51),
      level: 12
    };
    const map = new kakao.maps.Map(container, options);

    detailData?.map((x) => (
      createLocation(map,x)
    ))
    
  }

  const createLocation = (map,data) =>{

    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(data.hssplyadres, function(result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">'+data.housenm+'</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        //map.setCenter(coords);
      } 
    })
}

  return (
    <>
      <div id="map"></div> 
    </>
  );
};
export default KakaoMap;