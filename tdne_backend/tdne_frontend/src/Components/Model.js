import React, { useEffect, useRef } from 'react'
import './Styles/Model.css'

export default function Model({rows, active, setActive}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

      // настройка системы координат
        ctx.translate(0.5, 0.5); // смещение на половину пикселя для более четкого рисования линий
        ctx.strokeStyle = '#000'; // цвет линий
        ctx.lineWidth = 1; // толщина линий

      // рисуем оси координат
        ctx.beginPath();
        ctx.moveTo(10, canvas.height / 2);
        ctx.lineTo(canvas.width - 10, canvas.height / 2);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 10);
        ctx.lineTo(canvas.width / 2, canvas.height - 10);
        ctx.stroke();

      // рисуем деления на оси X
        for (let i = -50; i <= 50; i++) {
        const x = canvas.width / 2 + i * 20;
        const y = canvas.height / 2;
        ctx.beginPath();
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x, y + 5);
        ctx.stroke();
        ctx.fillText(i, x - 3, y + 10);
        }

      // рисуем деления на оси Y
        for (let i = -50; i <= 50; i++) {
        const x = canvas.width / 2;
        const y = canvas.height / 2 - i * 20;
        ctx.beginPath();
        ctx.moveTo(x - 5, y);
        ctx.lineTo(x + 5, y);
        ctx.stroke();
        ctx.fillText(i, x + 10, y + 3);
        }
    }, []);


return (
    <div className={active ? "modal active": "modal"} onClick={() => setActive(false)}>
        <div className='modal__content' onClick={(e) => e.stopPropagation()}><canvas ref={canvasRef} width={450} height={450} />
            <div className='iputs'>
                <div className='first_coordinate'>
                    <label>Первая точка</label>X:<input className='coordinateRecAX' type="number"/>Y:<input className='coordinateRecAY' type="number"/>
                </div>
                <div className='first_coordinate'>
                    <label>Вторая точка</label>X:<input className='coordinateRecBX' type="number"/>Y:<input className='coordinateRecBY' type="number"/>
                </div>
            </div>
        </div>
    </div>
)
}
