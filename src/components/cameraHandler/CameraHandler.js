import React, { lazy, Suspense, useState, useEffect } from 'react';

import Camera from 'react-feather/dist/icons/camera';
import ArrowDown from 'react-feather/dist/icons/arrow-down';
import dataHandler from '../dataHandler';

import './cameraHandler.css';

const Video = lazy(() => import('../Video'));

const CameraHandler = () => {

  const [ isCameraSupported, setCameraSupported ] = useState(false);
  const [ isCameraEnabled, setCameraEnabled ] = useState(dataHandler.isCameraPermissionGranted());
  let temp;
  const getDevice=async()=>{
    const devices=await navigator.mediaDevices.enumerateDevices()
    console.log(devices)
  }
  useEffect(() => {
    //getDevice()
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      setCameraSupported(true);
    }
    temp=navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function'
 
    console.log(navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function')
  }, [])

  const onCamEnabled = () => {
    console.log("onCamEnabled run")
    dataHandler.cameraPermissionGranted();
    setCameraEnabled(true);
  }

  return (
    <>
      {isCameraSupported && isCameraEnabled ?
        <Suspense fallback={<div>Loading...</div>}>
          <Video />
        </Suspense>
      :
        null
      }
      {isCameraSupported && !isCameraEnabled ?
        <>
          <div className="cameraHandler__message">Enable your camera with the button below
            <br/>
            <div className="cameraHandler__messageIcon"><ArrowDown size={35}/></div>
          </div>
          <button type="button" aria-label="Enable Camera" className="btn__round camera__enable" onClick={onCamEnabled}>
            <Camera />
          </button>
        </>
        :
        ""
      }
      {!isCameraSupported ?
        <div className="cameraHandler__unsopported">
          <div>
            {temp?"success":"problemn"}
            <p> Error Your device does not support camera access or something went wrong <span role="img" aria-label="thinking-face">🤔</span></p>
            <p>You can enter the barcode below</p>
          </div>
        </div>
        :
        ""
      }
    </>
  );
}

export default CameraHandler;
