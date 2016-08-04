var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');
var _ = require('underscore');
import { Button, Table } from 'optimizely-oui';
// import { Router, Route, Link } from 'react-router'

// not using an ES6 transpiler
// var Router = require('react-router').Router
// var Route = require('react-router').Route
// var Link = require('react-router').Link

var App = React.createClass({

  getInitialState: function() {
    return {
    	masters: [],
    	downloadedProject: [],
    	currentProject: "6668600890", //this needs to be fetched
    	splicedArray: [], //merge master templates and the downloaded project
    	sidePanel: {},
      currentTab: null
    }
  },

  onAddTag: function() {
    //save information for the tag
    // call POST '/'
  	return null
  },

  onTabSelect: function() {
  	return null
  },

  onSelect: function(item, rowinfo) {
  	this.setState({
  		sidePanel: rowinfo //this is an object
  	});
  	console.log(rowinfo, "rowinfo")
  	console.log(this.state.sidePanel, " sidePanel in state");
  },

  onUpdate: function() {
    //save the updated information
    // POST'/updatetag/:tagid'
  	return null
  },

  onDelete: function() {
    //delete a tag
    // POST 'deletetag/:tagid'
  	return null
  },
  click: function(tab) {
    this.setState({
      currentTab: tab
    })
  },
  // componentDidUpdate: function(nextProps, nextState) {
  // },

  componentDidMount: function() {
  	fetch('http://localhost:4001/master')
    .then((response) => response.json())
    .then(response =>{
  		this.setState({
  			master: response
  		});
      console.log('master', response)
  	})
    .then(() => fetch('http://localhost:4001/download/' + this.state.currentProject))
    .then(response => response.json())
    .then((r) => {
      this.setState({
				downloadedProject: r
			})
			var newArray = [];
			var newObj = {};
			for (var i = 0; i < this.state.downloadedProject.length; i++) {
				for (var j = 0; j < this.state.master.length; j++) {
					console.log(this.state.downloadedProject[i].name, this.state.master[j].name)
					if (this.state.downloadedProject[i].name === this.state.master[j].name) {
						newObj = $.extend({}, this.state.master[j], this.state.downloadedProject[i])
						newArray.push(newObj);
					}
				}
			};
			this.setState({
				splicedArray: newArray
			})
		}).catch((e) => {
      		console.log("Err: " , e);
    })
  },

  render: function() {
  	console.log("app state upon render", this.state);
  	return (
  		<div> 
  			<div className="tabs tabs--small tabs--sub" data-oui-tabs>
  				<ul className="tabs-nav soft-double--sides">
  					<li className="tabs-nav__item is-active" data-oui-tabs-nav-item>My Tags</li>
  					<li className="tabs-nav__item" data-oui-tabs-nav-item>Available Tags</li>
  				</ul>



  				<div className="flex height--1-1">
  					<div className="flex--1 soft-double--sides">
  						<ul className="flex push-double--ends">
  							<li className="push-triple--right">
  								<div className="button-group">
  									<div> Need to put filter here </div>
  									<div className="search">
  										<input type="text" className="text-input text-input--search width--200" placeholder="Filter by Name"/>
  									</div>
  									<button className="button" type="button">Search</button>
  								</div>
  							</li>
  							<li className="anchor--right">
  								<button className="button button--highlight">Create Custom Tag</button>
  							</li>
  						</ul>


  						<Table1/> 
  						<Table2/>

				      //table three
				      	<h1 className='header1'> My Tags </h1>
				      	<table className="table table--rule table--hover">
				      		<thead>
				      			<tr>
				      				<th className = "cell-collapse">Logo</th>
				      				<th>Name</th>
				      				<th>Category</th>
								    <th>Called On</th>
								    <th className = "cell-collapse">Rank</th>
								    <th className="cell-collapse">Status</th>
				      			</tr>
				      		</thead>
				      		<tbody>
						     	{this.state.splicedArray.map(function(rowinfo, item) {
						      		return <TableColumnMyTags onSelect={this.onSelect.bind(this, item, rowinfo)} key={item} name={rowinfo.name} called={rowinfo.trackingTrigger}/>
						      	}.bind(this))
			 					}
				 			 	<tr className="table-row--active">
				  					<td>Experiment name two that runs longer</td>
				  					<td className="numerical" id="row-centered">19</td>
				  					<td id="row-centered">Down</td>
				  				</tr>
				  				<tr>
				  					<td>Experiment name three</td>
				  					<td className="numerical" id="row-centered">400</td>
				  					<td id="row-centered">Up</td>
				  				</tr>
				  			</tbody>
				  		</table>

				  		<Table4/>
				  		<Tab/>
				  		<SearchBar/>
				  		<TagsPage splicedArray={this.state.splicedArray} onSelect={this.onSelect} info={this.state.sidePanel}/>
				  	</div>
				  	<SidePanelEditable info={this.state.sidePanel} />
				</div>
			</div>
		</div>
	);
  }
})

var TagsPage = React.createClass({
  render: function () {
    return (
      <div className="flex height--1-1">
        <TableContent splicedArray={this.props.splicedArray} onSelect={this.props.onSelect}/>
        <SidePanelEditable info={this.props.info} />
      </div>
    )
  }
})

var Tab = React.createClass({
  render: function() {
    return (
      <div className="tabs tabs--small tabs--sub" data-oui-tabs>
        <ul className="tabs-nav soft-double--sides">
          <li className="tabs-nav__item is-active" data-oui-tabs-nav-item onClick={this.click}>My Tags</li>
          <li className="tabs-nav__item" data-oui-tabs-nav-item onClick={this.click}>Available Tags</li>
          <li className="tabs-nav__item" data-oui-tabs-nav-item onClick={this.click}>Create Tag</li>
        </ul>
      </div>
    )
  }
})

var SearchBar = React.createClass({
  render: function() {
    return (
      <div className="flex--1 soft-double--sides">
        <ul className="flex push-double--ends">
          <li className="push-triple--right">
            <div className="button-group">
              <div> Need to put filter here </div>
              <div className="search">
                <input type="text" className="text-input text-input--search width--200" placeholder="Filter by Name"/>
              </div>
              <button className="button" type="button">Search</button>
            </div>
          </li>
          <li className="anchor--right">
            <button className="button button--highlight">Create Custom Tag</button>
          </li>
        </ul>
      </div>
    )
  }
})

var TableContent = React.createClass({

  render: function() {
    console.log("table content", this.props);
    return (
      <div>
        <h1 className='header1'> My Tags </h1>
        <table className="table table--rule table--hover">
          <thead>
            <tr>
              <th className = "cell-collapse">Logo</th>
              <th>Name</th>
              <th>Category</th>
              <th>Called On</th>
              <th className="cell-collapse">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.splicedArray.map((rowinfo, item) => {
                return <TableColumnMyTags onSelect={this.props.onSelect.bind(this, item, rowinfo)} key={item} name={rowinfo.name} called={rowinfo.trackingTrigger}/>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
})

var TableColumnMyTags = React.createClass({
	render: function() {
		return (
   		 <tr onClick={this.props.onSelect}>
          <td>GA LOGO</td>
          <td id="row-centered">{this.props.name}</td>
          <td id="row-centered"> Analytics </td>
          <td id="row-centered">{this.props.called} </td>
          // <td id="row-centered"> 1 </td>
          <td id="row-centered"> Enabled </td>
       </tr>
    )
	}
})

var TableColumnAvailable = React.createClass({
	render: function() {
    return (
   		 <tr onClick={this.props.onSelect}>
          <td>LOGO</td>
          <td id="row-centered">{this.props.name}</td>
          <td id="row-centered"> Analytics </td>
          <td id="row-centered">{this.props.called} </td>
          <td id="row-centered"> Enabled </td>
       </tr>
     )
	}
})


var SidePanelEditable = React.createClass({
	render: function() {
			console.log(this.props, "this.props")
		if (this.props.info.name) {
					return (
						<div className="sidepanel background--faint">
					      <h2 className="push-double--bottom">Experiment Details</h2>
					      <div> Logo and {this.props.info.name} </div>
					      <label className="label label--rule">
					          <div className="flex">
					            <div className="flex--1">Description</div>
					          </div>
					        </label>
					        <div> {this.props.info.tagDescription} </div>
					        {this.props.info.fields.map(function(field, item) {
					        	return <InputFieldsEditable key={item} field={field}/>
					        })}
					        <div> Whether its X or Y </div>
						    <select className="form-control" name='trackingTrigger'>
						      <option value='inHeader'>In header</option>
						      <option value='onPageLoad'>On page load</option>
						    </select>
					        <div> Rank Rank Rank</div>
					        <input placeholder="Rank here" />
					        <div> Enabled or Disabled? </div>
						    <select className="form-control" name='trackingTrigger'>
						      <option value='inHeader'>Enabled</option>
						      <option value='onPageLoad'>Disabled</option>
						    </select>
						  <button className="button button--highlight">Update</button>
						  <button className="button button--highlight">Delete</button>
					  </div>
					)
		} else {
			return <div> </div>;
		}
	}
})

var InputFieldsEditable = React.createClass({
	render: function () {
		return (
				<div>
					    <label className="label label--rule">
			            <div className="flex">
			               <div className="flex--1">{this.props.field.name}</div>
			            </div>
				        </label>
				        <div> {this.props.field.descripton} </div>
				        <input placeholder={this.props.field.value} />
		        </div>
		)
	}
})

var SidePanelAdding = React.createClass({
	render: function() {
		<div>
		</div>
	}
})


var Page = React.createClass({
	render: function() {
		<div> </div>
	}
})


var Table1 = React.createClass({
	render: function () {
		return (
			<div>
					  <h1 className='header1'> My Tags </h1>
				      <table className="table table--rule table--hover">
				        <thead>
				          <tr>
				            <th>Experiment</th>
				            <th className="numerical">Numbers</th>
				            <th className="cell-collapse">Status</th>
				          </tr>
				        </thead>
				        <tbody>
				          <tr>
				            <td>Experiment name one</td>
				            <td className="numerical">258</td>
				            <td>Up</td>
				          </tr>
				          <tr className="table-row--active">
				            <td>Experiment name two that runs longer</td>
				            <td className="numerical">19</td>
				            <td>Down</td>
				          </tr>
				          <tr>
				            <td>Experiment name three</td>
				            <td className="numerical">400</td>
				            <td>Up</td>
				          </tr>
				        </tbody>
				      </table>
		      </div>
			)
	}
})


var Table2 = React.createClass({
	render: function () {
		return (
			<div>
				  	  <h1 className='header1'> My Tags </h1>
				      <table className="table table--rule table--hover">
				        <thead>
				          <tr>
				            <th className = "cell-collapse">Logo</th>
				            <th>Name</th>
				            <th>Category</th>
				            <th>Called On</th>
				            <th className = "cell-collapse">Rank</th>
				            <th className="cell-collapse">Status</th>
				          </tr>
				        </thead>
				        <tbody>
				          <tr>
				            <td>GA LOGO</td>
				            <td id="row-centered">Universal Analytics</td>
				            <td id="row-centered"> Analytics </td>
				            <td id="row-centered"> Page Load </td>
				            <td id="row-centered"> 1 </td>
				            <td id="row-centered"> Enabled </td>
				          </tr>
				          <tr className="table-row--active">
				            <td>Experiment name two that runs longer</td>
				            <td className="numerical" id="row-centered">19</td>
				            <td id="row-centered">Down</td>
				          </tr>
				          <tr>
				            <td>Experiment name three</td>
				            <td className="numerical" id="row-centered">400</td>
				            <td id="row-centered">Up</td>
				          </tr>
				        </tbody>
				      </table>
		       </div>
			)
	}
})

var Table4 = React.createClass({
	render: function () {
		return (
			<div> 
				  	  <h1 className='header1'> My Tags </h1>
				      <table className="table table--rule table--hover">
				        <thead>
				          <tr>
				            <th className = "cell-collapse">Logo</th>
				            <th>Name</th>
				            <th>Category</th>
				            <th>Called On</th>
				            <th className = "cell-collapse">Rank</th>
				            <th className="cell-collapse">Status</th>
				          </tr>
				        </thead>
				        <tbody>
				          <tr>
				            <td>GA LOGO</td>
				            <td id="row-centered">Universal Analytics</td>
				            <td id="row-centered"> Analytics </td>
				            <td id="row-centered"> Page Load </td>
				            <td id="row-centered"> 1 </td>
				            <td id="row-centered"> Enabled </td>
				          </tr>
				          <tr className="table-row--active">
				            <td>Experiment name two that runs longer</td>
				            <td className="numerical" id="row-centered">19</td>
				            <td id="row-centered">Down</td>
				          </tr>
				          <tr>
				            <td>Experiment name three</td>
				            <td className="numerical" id="row-centered">400</td>
				            <td id="row-centered">Up</td>
				          </tr>
				        </tbody>
				      </table>
		      </div>
			)
	}
})

ReactDOM.render(<App />, document.getElementById('root'));
