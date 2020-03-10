import React, {Component} from 'react';
import SkillCard from './SkillCard';

// const skillList = [
//     {
//         id: 0,
//         skill: "Java"
//     },
//     {
//         id: 1,
//         skill: "Javaipt"
//     },
//     {
//         id: 2,
//         skill: "Jcript"
//     },
//     {
//         id: 3,
//         skill: "Ja"
//     },
//     {
//         id: 4,
//         skill: "JS"
//     }
// ]

class SkillContainer extends Component{

    constructor(props){
        super(props);
        this.state={
            // list: [0,1,2,3]
            list: [
                {
                    id: 0,
                    skill: "1"
                },
                {
                    id: 1,
                    skill: "2"
                },
                {
                    id: 2,
                    skill: "3"
                },
                {
                    id: 3,
                    skill: "4"
                },
                {
                    id: 4,
                    skill: "5"
                }
            ]
        }
    }

    changePos = (i, newPos, oldPos)=>{
        let cards = this.state.list;
        for (let j = 0; j < cards.length; j++) {
            if (j !== i) {
                if (cards[j].id ===newPos) {
                    cards[j].id = oldPos;
                    cards[i].id = newPos;
                }
            }
        }
        this.setState({
            list: cards
        })
    }

    render(){

        const skillCard = this.state.list.map((item, index)=>(
            <SkillCard
                key={index}
                index={index}
                id={item.id}
                item={item}
                handlePos={this.changePos}
                list={this.state.list}
            />
        ))
    
        return(
            <div className="skillCon">{skillCard}</div>
        );
    }

}

export default SkillContainer;