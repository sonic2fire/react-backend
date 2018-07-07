import React from 'react';
import Card from '../Db/cardFunctions.js'

var jsonfile = require('jsonfile')
var file = './cards.json'

export default class Form extends React.Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description:'',
      image:null,
      skills:[{skill:''}],
      links:[{name:'', link:''}]
    }

    this.fileInput = React.createRef();
 }


  handleTitle = (event) => {
    this.setState({title: event.target.value})
  };

  handleDescription = (event) => {
    this.setState({description: event.target.value})
  };

  handleImage = (event) => {
    
    var file = URL.createObjectURL(event.target.files[0])

    this.setState({
      image: file
    })

  };

  addSkill = () => {
    this.setState({
      skills: this.state.skills.concat([{skill:''}])
    });
  };

  addLink = () => {
    this.setState({
      links: this.state.links.concat([{name:'', link:''}])
    });
  };

  removeSkill = (idx) => () => {
    console.log(idx)
    this.setState({
      skills: this.state.skills.filter((s, sidx) => idx !== sidx)
    });
  };

  removeLink = (idx) => () => {
    console.log(idx)
    this.setState({
      links: this.state.links.filter((l, lidx) => idx !== lidx)
    });
  };

  changeSkill = (idx) => (event) => {
    const newSkill = this.state.skills.map((skill,sidx) => {
        if (idx !== sidx) return skill;
        return { ...skill, skill: event.target.value };
      });

    this.setState({ skills: newSkill })
  }

  changeLink = (idx) => (event) => {
    const newLink = this.state.links.map((link,lidx) => {
        if (idx !== lidx) return link;
        return { ...link, link: event.target.value };
      });

    this.setState({ links: newLink })
  }

  changeLinkName = (idx) => (event) => {
    const newLinkName = this.state.links.map((name,lidx) => {
        if (idx !== lidx) return name;
        return { ...name, name: event.target.value };
      });

    this.setState({ links: newLinkName })
  }

  clear = () => {
    var form = this.state
    this.saveCard(form)
    this.setState({
      title: '',
      description:'',
      image:null,
      skills:[{skill:''}],
      links:[{name:'', link:''}]
    })
  }

  handleSubmit = (event) => {
    console.log(JSON.stringify(this.state))
    this.saveCard(this.state)
    var string = 'A name was submitted: ' + this.state.title+'\nwith description: '+this.state.description+'\n with these skills\n '
    this.state.skills.map((skill,idx) => {
      string = string + skill.skill + '\n'
    })
    //this.clear()
    alert(string);
    event.preventDefault();
  };

  saveCard = (form) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('http://localhost:3001/cards', {
      method: 'POST',
      headers: myHeaders,
      mode: 'no-cors',
      cache: 'default',
      body: JSON.stringify(form),
    }).then(response => response.json())

  }


  render() {
    return (

          <form onSubmit={this.handleSubmit}>
          <ul className='formList'>
            <li>
              <label> Title: </label>
              <input type="text" value={this.state.title}  onChange={this.handleTitle} />

            <label> Description: </label>
              <textarea value={this.state.description} onChange={this.handleDescription} />
            </li>
            <li>
            <label> Image: </label>
              <input type="file" onChange={this.handleImage} ref={this.fileInput}/>
              <img src={this.state.image}/>
            </li>
            <li>
              <label> Skills: </label>
                

                {this.state.skills.map((skills, idx) => (
                  <div>
                    <input
                      type="text"
                      className='Formskills'
                      onChange={this.changeSkill(idx)}
                      value = {skills.skill}
                    />
                    <button type="button" onClick={this.removeSkill(idx)} className="rmvSkills">-</button>
                  </div>
                  ))}
                <input type="button" value="Add Skill" onClick={this.addSkill}/>
              </li>

              <li>
              <label> Links: </label>
                

                {this.state.links.map((links, idx) => (
                  <div>
                  <label> Link Title: </label>
                    <input
                      type="text"
                      className='Formskills'
                      onChange={this.changeLinkName(idx)}
                      value = {links.name}
                    />
                    <label> Link: </label>
                    <input
                      type="text"
                      className='Formskills'
                      onChange={this.changeLink(idx)}
                      value = {links.link}
                    />
                    <button type="button" onClick={this.removeLink(idx)} className="rmvSkills">-</button>
                  </div>
                  ))}
                <input type="button" value="Add Link" onClick={this.addLink}/>
              </li>
                
            </ul>

            <div id="submitLine">

            <input type="submit" value="Submit"/>
            <button type="button" id="clear" onClick={this.clear}> clear </button>
            
            </div>

          </form>
        );
    }
}