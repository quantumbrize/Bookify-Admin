import React, { useState, useRef, useEffect } from 'react';
import './CategoryForm.css';
import { config } from '../../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { readFileAsBase64 } from '../../../utils/fileHandle'
import useOutsideClickListener from '../../customhook/useOutsideClickListener';
import { useNavigate } from 'react-router-dom';

function CategoryForm() {

    const [isActive, setIsActive] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const fileInputRef = useRef(null);
    const listTypeMenuRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();



    const addCategory = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setIsLoading(true);

        try {
            let fileData = ''
            if (file) {
                // Convert file to Base64 string and wait for the result
                const str = await readFileAsBase64(file);
                fileData = str
            }

            let jsonData = {
                file: fileData,
                title: categoryName,
                status: isActive,
                type: 'parent',
                parentId: null,
            }


            if (fileData == '') {
                toast.error('please Upload a Category Icon', {
                    position: 'top-center',
                });
                setIsLoading(false);
                return;
            } else if (categoryName == '') {
                toast.error('please add Category Name', {
                    position: 'top-center',
                });
                setIsLoading(false);
                return;
            }else {
                // Send the request
                const response = await fetch(`${config.backEndBaseUrl}api/category/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsonData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (!result.status) {
                    toast.error(result.errors[0].msg, {
                        position: 'top-center',
                    });
                } else {
                    toast.success(result.message, {
                        position: 'top-center',
                    });
                    resetForm();
                    navigate('/admin/category/list');
                }
            }

        } catch (error) {
            console.error('Error adding data:', error);
        }finally {
            setIsLoading(false);
        }
    };



    const resetForm = () => {
        setFile(null);
        setPreview(null);
        setCategoryName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreview(fileReader.result);
            };
            fileReader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleIsActiveCheckboxChange = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <ToastContainer />
            <div className="wg-box">
                <form className="form-new-product form-style-1" onSubmit={addCategory}>
                    <fieldset className="name">
                        <div className="body-title">Category name: <span className="tf-color-1">*</span></div>
                        <input className="flex-grow" type="text" placeholder="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </fieldset>

                    <fieldset>
                        <div className="body-title">Upload icon: <span className="tf-color-1">*</span></div>
                        <div className="upload-image flex-grow">
                            <div className="item up-load">
                                <label className="uploadfile" htmlFor="myFile">
                                    <span className="icon">
                                        <i className="icon-upload-cloud"></i>
                                    </span>
                                    <span className="body-text"><span className="tf-color">Click to browse Images</span>
                                    </span>
                                    <input type="file" id="myFile" onChange={handleFileChange} ref={fileInputRef} />
                                    {preview && (
                                        <div className="image-preview">
                                            <img src={preview} alt="Image_Preview" className='prvImg' />
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                    </fieldset>



                    <fieldset>
                        <div className="body-title">Category Disable/Enable:</div>
                        <label className="switch">
                            <input type="checkbox" checked={isActive} onChange={handleIsActiveCheckboxChange} />
                            <span className="slider round"></span>
                        </label>
                    </fieldset>


                    <div className="bot">
                        <div></div>
                        <button type="submit" className="tf-button w208 h10" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CategoryForm;
