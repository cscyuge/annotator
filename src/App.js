import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Tooltip extends React.Component{
  constructor(props){
    super(props);
    this.state={
      display:false,
      left:0,
      top:0,
      origin:props.origin,
      translation:props.translation,
      link:props.link,
      reference:props.reference,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    this.setState({
      display:!this.state.display,
      left:e.pageX,
      top:e.pageY
    })
    console.log(e);
  }

  render() {
    const origin = this.state.origin;
    const link = this.state.link;
    const translation = this.state.translation;
    const reference = this.state.reference;
    return (
      <div className="Tooltip">
        <a 
          href="#"
          onClick={this.handleClick}
        >
            {origin}
        </a>
        <span className = {this.state.display? "active":"inactive"} style={{left:this.state.left+"px",top:this.state.top+"px"}}>
          <span>{translation}</span><br/>
          Link:<br/>
          <span>{link}</span><br/>
          <span style={{fontSize:"14px", fontStyle:"italic"}}>{reference}</span>
          
        </span>
      </div>
    )
  }
}


class Content extends React.Component {
  constructor(props){
    super(props);
    this.state={
      text: "患有二尖瓣关闭不全的病人在日常饮食上应该食用含胶原蛋白丰富的食物，因为胶原蛋白能改善血液的黏稠度，降低血液的粘滞力，从而减少乳酸的形成。",
    }
  }

  render() {
      return (
        // <textarea placeholder="content" className="content" id="content"></textarea>
        <p placeholder="content" className="content" id="content"  >{this.state.text} </p>
        //contentEditable={true}
      );
  }
}



class Search extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    console.log(this.props.keyword);
    e.preventDefault();
  }

  handleChange(e){
    this.setState({keyword:e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} name="search">
        <label>
          <textarea placeholder="Search Box" className="search-box" value={this.props.keyword} onChange={this.handleChange} /><br/>
        </label>
        {/* <button type="sumbit">search</button><br/> */}
        <iframe 
          className="search-results" 
          src={this.props.src+this.props.keyword}
        />
        <br/>
      </form>
    )
  }
}



class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMark = this.handleMark.bind(this);
    this.handleTranslate = this.handleTranslate.bind(this);
    this.handleRef = this.handleRef.bind(this);
    
    this.state={
      keyword:"",
      src:"http://www.a-hospital.com/w/",
      origin:"TOOLTIP",
      translation:"TRANSLATION",
      link:"LINK",
      reference:"REFERENCE",
      mark:false,
    }
  }

  handleSelect(){
    this.setState({mark:false});
    const selection=document.getSelection();
    console.log(selection);
    const wholeText=selection.baseNode.wholeText;
    const l=selection.anchorOffset;
    const r=selection.focusOffset;
    const select_text=wholeText.substr(l,r-l);
    // console.log(wholeText);
    console.log(select_text);
    this.setState({keyword:select_text});
  }

  handleMark(){
    this.setState({mark:true})
  }

  handleTranslate(e){
    this.setState({
      translation:e.target.value,
    })
  }

  handleRef(e){
    this.setState({
      reference:e.target.value,
    })
  }

  render(){
    const keyword = this.state.keyword;
    const src = this.state.src;
    const link = src+keyword;
    const mark = this.state.mark;
    const translation = this.state.translation;
    const reference = this.state.reference;
    return ( 
      <div className="App" name="App">
        <Content/><br/>
        {
          mark ?
          <Tooltip origin={keyword} link={link} reference={reference} translation={translation}/> : <br/>
        }
        <button className="select" onClick={this.handleSelect}>select</button><br/>
        <button className="last">last</button>
        <button className="next">next</button><br/>
        <button className="mark" onClick={this.handleMark}>mark</button><br/>
        <textarea placeholder="Translation" className="translation" onChange={this.handleTranslate}></textarea><br/>
        <textarea placeholder="Link" className="translation" value={link}></textarea><br/>
        <textarea placeholder="Reference" className="translation" onChange={this.handleRef}></textarea><br/>
        <Search keyword={keyword} src={src}/>

        <button className="label">label</button><br/>
      </div>
    )
  }
}

export default App;
