var React = require('react');

var AvailableTableRow = React.createClass({
	render: function() {
	  // 	console.log('availabletablerow mounted')
		// console.log(this.props, "props for availabletablerow")
		return (
   		 <tr onClick={this.props.onSelect}>
          <td id="row-centered"> <img src={this.props.rowinfo.logo}/></td>
          <td id="row-centered">{this.props.rowinfo.displayName}</td>
          <td id="row-centered">{this.props.rowinfo.category} </td>
          <td id="row-centered">{this.props.rowinfo.called} </td>
          <td id="row-centered"> Enabled </td>
       </tr>
    )
	}
})

module.exports = AvailableTableRow;
