import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fontOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
];

const sizeOptions = [
    { value: 'small', label: '작게' },
    { value: 'medium', label: '보통' },
    { value: 'large', label: '크게' },
];

function Write() {
    const [font, setFont] = useState(null);
    const [size, setSize] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [isNotice, setIsNotice] = useState(false);

    const navigate = useNavigate();

    const handleFontChange = (selectedOption) => {
        setFont(selectedOption);
    };

    const handleSizeChange = (selectedOption) => {
        setSize(selectedOption);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    
    const handleCheckChange = (event) => {
        setIsNotice(event.target.checked);
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImages([...images, file]);
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const handleSubmit = async () => {

        try {
            const formData = new FormData();
            formData.append('is_notice', isNotice);
            formData.append('title', title);
            formData.append('font', font?.value);
            formData.append('size', size?.value);
            formData.append('content', content);
            images.forEach((image) => {
                formData.append('images', image);
            });

            const response = await fetch('http://localhost:8484/posts', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            if (data.success == true) {
                alert("글이 작성되었습니다.");
                navigate('../news-list')
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="write-whole">
            <form encType='multipart/form-data'>
                <input className="write-title-box" placeholder="제목을 입력하세요." value={title} onChange={handleTitleChange} />
                <Select className="write-select" options={fontOptions} onChange={handleFontChange} value={font} placeholder="폰트 선택" />
                <Select className="write-select" options={sizeOptions} onChange={handleSizeChange} value={size} placeholder="글씨 크기 선택" />
                <div>
                    <input type="file" name="images" accept="image/*" onChange={handleImageChange} />
                    <input type="checkbox" className="is-notice-check" onChange={handleCheckChange} /><label for="is-notice-check">메인 화면에 공지</label>
                </div>
                <textarea className="write-content-box" value={content} onChange={handleContentChange} />
            </form>

            {imagePreviewUrl && <img src={imagePreviewUrl} alt="이미지 미리보기" />}
            {imagePreviewUrl && <button onClick={() => setImagePreviewUrl('')}>
                삭제
            </button>}

            <button type="submit" className="write-write-button" onClick={handleSubmit}>게시물 작성</button>
        </div>
    );
}

export default Write;