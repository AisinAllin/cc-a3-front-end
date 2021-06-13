import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import * as apiUtils from "../../apiUtil/apiUtil";
import AWS from "aws-sdk";
import "./AddProducn.css";

const S3_BUCKET = "cc-a3-img";
const REGION = "ap-southeast-2";

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const AddProduct = () => {
  const history = useHistory();

  const userId = localStorage.getItem("userId");
  const count = 0;
  const [musicInsInfo, setMusicInsInfo] = useState({
    type: "",
    name: "",
    num_left: "",
    price: "",
    description: "",
  });
  const [musicId, setMusicId] = useState();

  const { type, name, num_left, price, description } = musicInsInfo;

  const [error, setError] = useState({
    show: false,
    error: "",
  });
  const handleBack = () => {
    getMusicUrl();
    history.push("/dashboard");
  };
  const handleCancel = () => {
    history.push("/dashboard");
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const addNewRes = await apiUtils.addNewProduct({
      userId,
      count,
      type,
      name,
      num_left,
      price,
      description,
    });

    if (addNewRes.status === 200) {
      setMusicId(addNewRes.data.musicId);
      setForm(true);
    }
  };

  /*
   */
  const getMusicUrl = async () => {
    console.log(musicId);

    const getURLRes = await apiUtils.getMusicImgUrl({ musicId });
    if (getURLRes.status === 200) {
      console.log(getURLRes.data);
      const id = `${musicId}`;
      const link = getURLRes.data;
      console.log(id);
      console.log(link);
      const lambdaPutRes = await apiUtils.lambdaPutData({ id, link });
    }
  };

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState(false);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: `${musicId}`,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        alert("addSuccessfullly");
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <h1>Add Product</h1>
      {form ? (
        <div>
          <h3>Add The Image For This Musical Instrument</h3>
          <h4>Step 2/2</h4>

          <div className="upload_explain">
            Native SDK File Upload Progress is {progress}%
          </div>
          <input type="file" onChange={handleFileInput} name="test" />
          <Button
            variant="contained"
            color="primary"
            onClick={() => uploadFile(selectedFile)}
          >
            Upload to S3
          </Button>
          <Button variant="contained" className="button" onClick={handleBack}>
            Back
          </Button>
        </div>
      ) : (
        <>
          <h4>Step 1/2</h4>

          <form onSubmit={onSubmit}>
            <div className="login_item">
              Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={type}
                onChange={(event) => {
                  setMusicInsInfo({
                    ...musicInsInfo,
                    type: event.target.value,
                  });
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={name}
                onChange={(event) => {
                  setMusicInsInfo({
                    ...musicInsInfo,
                    name: event.target.value,
                  });
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              In Stock:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={num_left}
                onChange={(event) => {
                  setMusicInsInfo({
                    ...musicInsInfo,
                    num_left: event.target.value,
                  });
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={price}
                onChange={(event) => {
                  setMusicInsInfo({
                    ...musicInsInfo,
                    price: event.target.value,
                  });
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              Description:&nbsp;
              <input
                value={description}
                onChange={(event) => {
                  setMusicInsInfo({
                    ...musicInsInfo,
                    description: event.target.value,
                  });
                  setError({ show: false });
                }}
              />
            </div>

            {error.show ? <p className="errorMessage">{error.error}</p> : null}

            <div className="login_item">
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </div>
          </form>

          <Button className="button" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};

export default AddProduct;
