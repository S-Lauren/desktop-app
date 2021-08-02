const electron = window.require('electron');
import glob from 'glob';
import React, { useState } from 'react';
const sharp = require('sharp');

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
const remote = electron.remote
const { dialog } = remote


const Hello = () => {
  const [filePath, setFilePath] = useState<any>([])
  const [value, setValue] = useState<any>("")

  const openDialog = () => {
    return dialog.showOpenDialog(
      {
        title: 'Open Dialogue',
        message: 'First Dialog',
        filters: [
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
          { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
          { name: 'Custom File Type', extensions: ['as'] },
          { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openDirectory', 'multiSelections']
      }
    ).then((result: any) => {
      setFilePath(result.filePaths)
    })
  }
  // console.log(filePath)
  const fileString = filePath + '';
  const fileOutput = fileString.split(".png");
  const resizeImage = () => {
    const res = glob.sync(`${filePath}/*.@(png|jpg|jpeg)`);
    console.log(res)
    res.forEach((image: any, index: any) => {
      console.log(image)
      return sharp(
        image
      ).resize(parseInt(value), parseInt(value))
        .toFile(`${fileOutput}/${index}.png`);
    })
  }

  return (
    <div>
      <div className="Hello">
        <h1>Resize Your Images </h1>
      </div>
      <div className="container">
        <div className='app__uploader'>
          <div className='app__uploader__icon-area'>
            {/* <img src='../assets/upload.svg' className='app__uploader__icon-area__icon' /> */}
            <p className='app__uploader__icon-area__text'>Drag file(s) to add</p>
          </div>
          <div className='app__uploader__button-area'>
            <button className='app__uploader__button-area__button' onClick={openDialog}>Click To Upload File</button>
            <button className='app__uploader__button-area__button' onClick={resizeImage}>Click To Resize File</button>
          </div>
        </div>
        <form>
          <select name="sizes" onChange={(e) => setValue(e.target.value)} value={value} id="image-size">
            <option value="">Choose Your Destiny</option>
            <option value="160">160x160</option>
            <option value="240">240x240</option>
            <option value="820">820x820</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
