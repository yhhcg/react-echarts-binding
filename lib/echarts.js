/**
 * @module Echarts
 */
import React from 'react';
import {
  object,
  string,
  bool,
  func,
  oneOfType,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import echarts from 'echarts';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';

import createEventCallback from './createEventCallback';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
});

/**
 * Echarts binding.
 * Echarts HOME{@link http://echarts.baidu.com/}.
 * For echarts events usage please reference to echarts API events paragraph{@link http://echarts.baidu.com/api.html#events}
 * Expose onComplete api to help you to get echarts instance.
 * @param {Object|string} [props.theme] - Echarts.init api parameters. {@link http://echarts.baidu.com/api.html#echarts.init}
 * @param {Object} [props.opts] - Echarts.init api parameters.
 * @param {Object} props.option - Configuration item and data. {@link http://echarts.baidu.com/api.html#echartsInstance.setOption}
 * @param {boolean} [props.notMerge] - EchartsInstance.setOption api parameters.
 * @param {boolean} [props.lazyUpdate] - EchartsInstance.setOption api parameters.
 * @param {boolean} [props.silent] - EchartsInstance.setOption api parameters.
 * @param {function} props.onComplete - Complete callback
 * @param {function} props.onClick - Click callback
 * @param {function} props.onDblClick - Double click callback
 * @param {function} props.onMouseDown - Mouse down callback
 * @param {function} props.onMouseUp - Mouse up callback
 * @param {function} props.onMouseOver - Mouse over callback
 * @param {function} props.onMouseOut - Mouse out callback
 * @param {function} props.onGlobalOut - Global out callback
 * @param {function} props.onLegendSelectChanged - Callback fired after legend selecting state changes.
 * @param {function} props.onLegendSelected - Callback fired after legend is selected.
 * @param {function} props.onLegendUnselected - Callback fired after unselecting legend.
 * @param {function} props.onLegendScroll - Callback fired when trigger legend scroll.
 * @param {function} props.onDataZoom - Callback fired after zooming data area.
 * @param {function} props.onDataRangeSelected - Callback fired after range is changed in visualMap.
 * @param {function} props.onTimeLineChanged - Callback fired after time point in timeline is changed.
 * @param {function} props.onTimeLinePlayChanged - Switching event of play state in timeline.
 * @param {function} props.onRestore - Resets option event.
 * @param {function} props.onDataViewChanged - Changing event of data view tool in toolbox.
 * @param {function} props.onMagicTypeChanged - Switching event of magic type tool in toolbox.
 * @param {function} props.onGeoSelectChanged - Callback fired when geo select is changed.
 * @param {function} props.onGeoSelected - Callback fired when geo is selected.
 * @param {function} props.onGeoUnselected - Callback fired when geo is unselected.
 * @param {function} props.onPieSelectChanged - Callback fired when pie chart selecting state changes.
 * @param {function} props.onPieSelected - Pie chartEvent after selecting.
 * @param {function} props.onPieUnselected - Pie chart cancels selected even
 * @param {function} props.onMapSelectChanged - Callback fired after map region selecting state changes.
 * @param {function} props.onMapSelected - Map regionEvent after selecting.
 * @param {function} props.onMapUnselected - Map region cancels selected event.
 * @param {function} props.onAxisAreaSelected - Selecting event of range of parallel axis.
 * @param {function} props.onFocusNodeAdjacency - Adjacent nodes highlight event in graph.
 * @param {function} props.onUnfocusNodeAdjacency - Adjacent nodes reverse-highlight event in graph.
 * @param {function} props.onBrush - Event triggered after action brush dispatched.
 * @param {function} props.onBrushSelected - This event will be triggered when dispatchAction called, or
 * use do brush behavior. But this event will not be triggered in setOption.
 */
@withStyles(styles)
class Echarts extends React.Component {
  static propTypes = {
    classes: object,
    theme: oneOfType([object, string]),
    opts: object,
    option: object.isRequired,
    notMerge: bool,
    lazyUpdate: bool,
    silent: bool,
    onComplete: func,
    onClick: func,
    onDblClick: func,
    onMouseDown: func,
    onMouseUp: func,
    onMouseOver: func,
    onMouseOut: func,
    onGlobalOut: func,
    onLegendSelectChanged: func,
    onLegendSelected: func,
    onLegendUnselected: func,
    onLegendScroll: func,
    onDataZoom: func,
    onDataRangeSelected: func,
    onTimeLineChanged: func,
    onTimeLinePlayChanged: func,
    onRestore: func,
    onDataViewChanged: func,
    onMagicTypeChanged: func,
    onGeoSelectChanged: func,
    onGeoSelected: func,
    onGeoUnselected: func,
    onPieSelectChanged: func,
    onPieSelected: func,
    onPieUnselected: func,
    onMapSelectChanged: func,
    onMapSelected: func,
    onMapUnselected: func,
    onAxisAreaSelected: func,
    onFocusNodeAdjacency: func,
    onUnfocusNodeAdjacency: func,
    onBrush: func,
    onBrushSelected: func,
  };

  static defaultProps = {};

  /**
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Init echarts
   * Set echarts options
   * Bind all events
   * Expose onComplete api
   * Listening dom changes
   */
  componentDidMount() {
    const {
      theme,
      opts,
      option,
      notMerge,
      lazyUpdate,
      silent,
      onComplete,
    } = this.props;

    this.echartsInstance = echarts.init(this.echartsDom, theme, opts);

    this.echartsInstance.setOption(option, {
      notMerge,
      lazyUpdate,
      silent,
    });
 
    this.eventCallbacks = this.parseEvents();

    this.bindEvents(this.echartsInstance, this.eventCallbacks);

    if (typeof onComplete === 'function') {
      onComplete(this.echartsInstance);
    }

    new ResizeSensor(this.echartsDom, () => { // Call resize callback if dom resized
      this.echartsInstance.resize();
    });
  }

  /**
   * Redraw if props updated
   * @param  {Object} nextProps
   * @param  {Object} nextState
   * @return {Boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    this.echartsInstance.setOption(nextProps.option);
    return false;
  }

  /**
   * Remove event listeners.
   * Destroy echarts instance.
   */
  componentWillUnmount() {
    this.echartsEventListeners.forEach((listener) => {
      this.echartsInstance.off(listener);
    });

    this.echartsInstance.clear();
    this.echartsInstance.dispose();
  }

  /**
   * Return an object of all supported event callbacks
   * @return {Object}
   */
  parseEvents() {
    return {
      onClick: createEventCallback('onClick').bind(this),
      onDblClick: createEventCallback('onDblClick').bind(this),
      onMouseDown: createEventCallback('onMouseDown').bind(this),
      onMouseUp: createEventCallback('onMouseUp').bind(this),
      onMouseOver: createEventCallback('onMouseOver').bind(this),
      onMouseOut: createEventCallback('onMouseOut').bind(this),
      onGlobalOut: createEventCallback('onGlobalOut').bind(this),
      onLegendSelectChanged: createEventCallback('onLegendSelectChanged').bind(this),
      onLegendSelected: createEventCallback('onLegendSelected').bind(this),
      onLegendUnselected: createEventCallback('onLegendUnselected').bind(this),
      onLegendScroll: createEventCallback('onLegendScroll').bind(this),
      onDataZoom: createEventCallback('onDataZoom').bind(this),
      onDataRangeSelected: createEventCallback('onDataRangeSelected').bind(this),
      onTimeLineChanged: createEventCallback('onTimeLineChanged').bind(this),
      onTimeLinePlayChanged: createEventCallback('onTimeLinePlayChanged').bind(this),
      onRestore: createEventCallback('onRestore').bind(this),
      onDataViewChanged: createEventCallback('onDataViewChanged').bind(this),
      onMagicTypeChanged: createEventCallback('onMagicTypeChanged').bind(this),
      onGeoSelectChanged: createEventCallback('onGeoSelectChanged').bind(this),
      onGeoSelected: createEventCallback('onGeoSelected').bind(this),
      onGeoUnselected: createEventCallback('onGeoUnselected').bind(this),
      onPieSelectChanged: createEventCallback('onPieSelectChanged').bind(this),
      onPieSelected: createEventCallback('onPieSelected').bind(this),
      onPieUnselected: createEventCallback('onPieUnselected').bind(this),
      onMapSelectChanged: createEventCallback('onMapSelectChanged').bind(this),
      onMapSelected: createEventCallback('onMapSelected').bind(this),
      onMapUnselected: createEventCallback('onMapUnselected').bind(this),
      onAxisAreaSelected: createEventCallback('onAxisAreaSelected').bind(this),
      onFocusNodeAdjacency: createEventCallback('onFocusNodeAdjacency').bind(this),
      onUnfocusNodeAdjacency: createEventCallback('onUnfocusNodeAdjacency').bind(this),
      onBrush: createEventCallback('onBrush').bind(this),
      onBrushSelected: createEventCallback('onBrushSelected').bind(this),
    };
  }

  /**
   * Bind all events on echarts instance.
   * Save event listeners.
   * Later to be removed in componentWillUnmount lifecycle.
   * @param  {Object} echartsInstance - Instance created through echarts.init.
   * @param  {Object} eventCallbacks - An object of all event callbacks
   */
  bindEvents(echartsInstance, eventCallbacks) {
    this.echartsEventListeners = [];

    Object.keys(eventCallbacks).forEach((key) => {
      const eventName = key.substring(2).toLowerCase();
      const handler = eventCallbacks[key];

      this.echartsEventListeners.push(
        echartsInstance.on(eventName, handler)
      );
    });
  }

  /**
   * Render Echarts component
   * @return {Component}
   */
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div
        className={classes.root}
        ref={(e) => {
          this.echartsDom = e;
        }}
      />
    );
  }
}

export default Echarts;

