import React, {} from 'react';

const Dropdown=(props)=>{
    // const [show, setShow] = useState(false);
    const list = props.show?(
        <ul className="dropdown">
            {props.options.map((el,i)=><li onclick={()=>props.onclick(el.text, props.id)} key={i}>{el.text}</li>)}
        </ul>
    ):null;

    return(
        <>
            {list}
        </>
    )
}

export default Dropdown;