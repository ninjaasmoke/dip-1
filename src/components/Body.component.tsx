import { useEffect, useRef, useState } from "react";
import { createExternalModuleReference } from "typescript";

export default function Body({ }) {
    const [picture, setPicture] = useState<File | null>(null);
    const [imgData, setImgData] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (imgData && canvasRef.current) {
            const img = document.getElementById('img') as HTMLImageElement;
            const ctx = canvasRef.current.getContext('2d');
            ctx?.drawImage(img, 0, 0, img.width, img.height);
        }
    }, [imgData]);


    const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            setPicture(file);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result as string);
            });
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="body">
            <div className="image-inputs">
                <input type="file" id="file" name="file" accept="image/*" onChange={onChangePicture} />
                {imgData && <img src={imgData} alt="Selected" className="selected-image-preview" id="img" />}
                {/* {imgData && <Buttons onClick={() => {
                    // console.log("imgData: ", imgData);
                }} />} */}
                <canvas className="selected-image-preview" id='canvas' ref={canvasRef}></canvas>
            </div>

            {imgData && <SideMenu />}
        </div>
    );
}

type ButtonProps = {
    onClick: () => void;
}
const Buttons: React.FC<ButtonProps> = ({ onClick }) => {
    return (
        <div className="download-big">
            <button onClick={onClick}>Download</button>
        </div>
    );
}

const SideMenu: React.FC = ({ }) => {
    return (
        <div className="side-menu">

        </div>
    );
}