import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';


import VideoSkeleton from './Video.skeleton';

import './video.css';

const Video = () => {
  const [ videoInit, setVideoInit ] = useState(false);
  const [ videoError, setVideoError ] = useState(false);
 const [ barcode, setBarcode ] = useState(null);
  const onInitSuccess = () => {
    Quagga.start();
    setVideoInit(true);
  }

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);
    console.log("result: ",result)
    setBarcode(result.codeResult.code)
  }

  

  useEffect(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#video')
        },
        numOfWorkers: 1,
        locate: true,
        decoder : {
          readers : ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
        }
      }, (err) => {
          if (err) {
            setVideoError(true);
            return;
          }
          onInitSuccess();
      });
      Quagga.onDetected(onDetected);
    }
  }, []);

  

  return (
    <div>
      <div className="video__explanation">
        <p>Scan a product&apos;s barcode and get its nutritional values <span role="img" aria-label="apple">🍎</span></p>
        <p>BarCode Number</p>
        <p>{barcode}</p>
      </div>
      <div className="video__container">
        {videoError ?
          <div className="skeleton__unsopported">
            <div>
              <p> Error !! Your device does not support camera access or something went wrong <span role="img" aria-label="thinking-face">🤔</span></p>
              <p>You can enter the barcode below</p>
             
            </div>
          </div>
          :
          <div>
            <div className="video" id="video" />
            {videoInit ? '' : <VideoSkeleton />}
          </div>
        }
      </div>
    </div>
    );
}

export default Video;
