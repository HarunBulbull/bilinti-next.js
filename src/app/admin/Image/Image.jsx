import React, { useState, useEffect, useCallback } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { token } from "../../layouts/GetUserData";
import './image.css';

export const Image = ({ onClose, onImagesSelected, images, maxImages }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [fileLabel, setFileLabel] = useState("Resim Seç");
  const [selectedImage, setSelectedImage] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Yükle");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSoruce] = useState([]);

  const fetchData = useCallback(async () => {
    let imageData = [];
    if (images) {
      const data = []
      if (images.substring(images.length - 1, images.length) == "\n") { images.slice(0, -1).split("\n").map((link) => (link != "" && (data.push(link.trim())))); }
      else { images.split("\n").map((link) => (link != "" && (data.push(link.trim())))); }
      imageData = data;
      setSelectedImages(data);
      setSelectedCount(data.length);
    }
    try {
      const response = await fetch(`${apiURL}/api/image/allImages`, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setDataSoruce(data);
      }
      else { messageApi.error("There is an error."); }
    }
    catch (error) { console.error(error); }
  }, [apiURL]);

  useEffect(() => { fetchData() }, [images, fetchData]);

  const handleFile = (e) => {
    setSelectedImage(e.target.files[0])
    const fileName = e.target.files[0].name;
    const MAX_FILE_NAME_LENGTH = 20;
    if (fileName.length > MAX_FILE_NAME_LENGTH) {
      const firstPart = fileName.slice(0, MAX_FILE_NAME_LENGTH - 3);
      const lastPart = fileName.slice(fileName.length - 3);
      const shortenedFileName = `${firstPart}...${lastPart}`;
      setFileLabel(shortenedFileName);
    }
    else { setFileLabel(fileName); }
  }

  const handleSubmit = async () => {
    if (selectedImage.size > 2097152) { return messageApi.error("Resim 2 MB'dan büyük olamaz.") }
    if (!selectedImage.type.includes('image/')) { return messageApi.error("Geçersiz dosya türü!") }
    if (fileLabel == "Select Image") { return messageApi.error("Bir resim seçmelisin.") }
    setButtonLabel("Yükleniyor...")
    setButtonDisabled(true);
    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
      const res = await fetch(`${apiURL}/api/image/upload`, {
        method: "POST",
        body: formData,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      await fetch(`${apiURL}/api/image/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      fetchData();
      setFileLabel("Resim Seç");
    }
    catch (error) { console.error(error); }
    setButtonLabel("Yükle")
    setButtonDisabled(false);
  };

  const handleSelect = (filename) => {
    const index = selectedImages.indexOf(filename);
    if (index != -1) {
      setSelectedCount(selectedCount - 1);
      const data = selectedImages;
      data.splice(index, 1);
      setSelectedImages(data)
    }
    else {
      if (selectedCount < maxImages) {
        setSelectedCount(selectedCount + 1);
        const data = selectedImages;
        data.push(filename)
        setSelectedImages(data)
      }
      else { messageApi.error("Maksimum " + maxImages + " resim seçebilirsin!") }
    }
  }

  const deleteList = () => {
    setSelectedImages([])
    setSelectedCount(0)
  }

  const savePhotos = () => {
    const data = selectedImages.reduce((acc, image) => acc + image + '\n', '');
    onImagesSelected(data);
  }


  return (
    <div>
      {contextHolder}

      <span className='blackblurbg' />
      <div className="selectImage-area">
        <form className="selectImage-head">
          <div className="selectImageHead-inputs adminPanelFlex">
            <input type="file" id='file' onChange={handleFile} />
            <label htmlFor="file">{fileLabel}</label>
            <Button type="primary" onClick={() => handleSubmit()} disabled={buttonDisabled}>{buttonLabel}</Button>
          </div>
          <b>{selectedCount} Resim Seçildi</b>
        </form>
        <div className="selectImage-All">
          {selectedImages.map((d, i) => (
            <div className='selectImage-image' key={i} >
              <img src={apiURL + "/api/image/" + d} onClick={() => handleSelect(d)} className={selectedImages.indexOf(d) > -1 ? (selectedImages.indexOf(d) == 0 ? "primarySelect" : "selectedImage") : ("")} />
              {selectedImages.indexOf(d) == 0 ? <b>Kapak</b> : <b>{selectedImages.indexOf(d)}. Fotoğraf</b>}
            </div>
          ))}
          {dataSource.filter((data) => !selectedImages.includes(data.filename)).map((d, i) => (
            <div className='selectImage-image' key={i} >
              <img src={apiURL + "/api/image/" + d.filename} onClick={() => handleSelect(d.filename)} />
              <b>Seçilmedi</b>
            </div>
          ))}
        </div>
        <div className="selectImage-bottom">
          <Popconfirm title="Temizle?" description="Seçilenleri temizlemek istediğinize emin misiniz?" okText="Evet" cancelText="İptal" onConfirm={() => deleteList()}><Button disabled={!selectedCount > 0} color="default" variant="solid">Temizle</Button></Popconfirm>
          <Button type='primary' disabled={!selectedCount > 0} onClick={() => savePhotos()}>Kaydet</Button>
          <Popconfirm title="İptal?" description="İptal etmek istediğinize emin misiniz?" okText="Evet" cancelText="Hayır" onConfirm={() => onClose()}><Button type='primary' danger>İptal</Button></Popconfirm>
        </div>
      </div>
    </div>
  );
}