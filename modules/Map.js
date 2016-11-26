// modules/Map.js
import React from 'react'
import * as esriLoader from 'esri-loader'

export default React.createClass({
  getInitialState () {
    // set up state to track when the arcgis api gets loaded
    return { loaded: esriLoader.isLoaded() }
  },
  render () {
    if (this.state.loaded) {
      // set up the map DOM
      return <div ref="map" style={{height: 'calc(100vh - 50px)'}}></div>
    } else {
      // show the loading indicator
      return <div className="loading">Loading...</div>
    }
  },
  componentDidMount () {
    if (!this.state.loaded) {
      // lazy load the arcgis api
      const options = {
        // use a specific version instead of latest 4.x
        url: '//js.arcgis.com/3.18compact/'
      }
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err)
        }
        // hide the loading indicator and show the map
        this.setState({
          loaded: true
        })
        this._createMap()
      }, options)
    } else {
      // arcgis api is already loaded, just create the map
      this._createMap()
    }
  },
  _createMap () {
    // require the map class
    esriLoader.dojoRequire(['esri/map'], (Map) => {
      // create a map at a DOM node in this component
      this._map = new Map(this.refs.map, {
        center: [-118, 34.5],
        zoom: 8,
        basemap: 'dark-gray'
      })
    })
  }
})
