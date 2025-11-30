(function(ve,S){typeof exports=="object"&&typeof module<"u"?S(exports,require("three")):typeof define=="function"&&define.amd?define(["exports","three"],S):(ve=typeof globalThis<"u"?globalThis:ve||self,S(ve.Gralobe={},ve.THREE))})(this,(function(ve,S){"use strict";function Ar(a){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(a){for(const t in a)if(t!=="default"){const i=Object.getOwnPropertyDescriptor(a,t);Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:()=>a[t]})}}return e.default=a,Object.freeze(e)}const M=Ar(S),ji={type:"change"},Ht={type:"start"},Yi={type:"end"},Tt=new S.Ray,Zi=new S.Plane,Tr=Math.cos(70*S.MathUtils.DEG2RAD),X=new S.Vector3,J=2*Math.PI,R={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Wt=1e-6;class Dr extends S.Controls{constructor(e,t=null){super(e,t),this.state=R.NONE,this.target=new S.Vector3,this.cursor=new S.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:S.MOUSE.ROTATE,MIDDLE:S.MOUSE.DOLLY,RIGHT:S.MOUSE.PAN},this.touches={ONE:S.TOUCH.ROTATE,TWO:S.TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new S.Vector3,this._lastQuaternion=new S.Quaternion,this._lastTargetPosition=new S.Vector3,this._quat=new S.Quaternion().setFromUnitVectors(e.up,new S.Vector3(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new S.Spherical,this._sphericalDelta=new S.Spherical,this._scale=1,this._panOffset=new S.Vector3,this._rotateStart=new S.Vector2,this._rotateEnd=new S.Vector2,this._rotateDelta=new S.Vector2,this._panStart=new S.Vector2,this._panEnd=new S.Vector2,this._panDelta=new S.Vector2,this._dollyStart=new S.Vector2,this._dollyEnd=new S.Vector2,this._dollyDelta=new S.Vector2,this._dollyDirection=new S.Vector3,this._mouse=new S.Vector2,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Or.bind(this),this._onPointerDown=Mr.bind(this),this._onPointerUp=kr.bind(this),this._onContextMenu=Nr.bind(this),this._onMouseWheel=Lr.bind(this),this._onKeyDown=Ur.bind(this),this._onTouchStart=Fr.bind(this),this._onTouchMove=zr.bind(this),this._onMouseDown=Ir.bind(this),this._onMouseMove=Rr.bind(this),this._interceptControlDown=$r.bind(this),this._interceptControlUp=Br.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ji),this.update(),this.state=R.NONE}update(e=null){const t=this.object.position;X.copy(t).sub(this.target),X.applyQuaternion(this._quat),this._spherical.setFromVector3(X),this.autoRotate&&this.state===R.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=J:i>Math.PI&&(i-=J),n<-Math.PI?n+=J:n>Math.PI&&(n-=J),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=s!=this._spherical.radius}if(X.setFromSpherical(this._spherical),X.applyQuaternion(this._quatInverse),t.copy(this.target).add(X),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const o=X.length();s=this._clampDistance(o*this._scale);const l=o-s;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new S.Vector3(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const h=new S.Vector3(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(o),this.object.updateMatrixWorld(),s=X.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(Tt.origin.copy(this.object.position),Tt.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Tt.direction))<Tr?this.object.lookAt(this.target):(Zi.setFromNormalAndCoplanarPoint(this.object.up,this.target),Tt.intersectPlane(Zi,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Wt||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Wt||this._lastTargetPosition.distanceToSquared(this.target)>Wt?(this.dispatchEvent(ji),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?J/60*this.autoRotateSpeed*e:J/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){X.setFromMatrixColumn(t,0),X.multiplyScalar(-e),this._panOffset.add(X)}_panUp(e,t){this.screenSpacePanning===!0?X.setFromMatrixColumn(t,1):(X.setFromMatrixColumn(t,0),X.crossVectors(this.object.up,X)),X.multiplyScalar(e),this._panOffset.add(X)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;X.copy(n).sub(this.target);let r=X.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=e-i.left,r=t-i.top,s=i.width,o=i.height;this._mouse.x=n/s*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(J*this._rotateDelta.x/t.clientHeight),this._rotateUp(J*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(J*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-J*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(J*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-J*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(i,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(i*i+n*n);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),n=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(J*this._rotateDelta.x/t.clientHeight),this._rotateUp(J*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(s,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new S.Vector2,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Mr(a){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(a.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(a)&&(this._addPointer(a),a.pointerType==="touch"?this._onTouchStart(a):this._onMouseDown(a)))}function Or(a){this.enabled!==!1&&(a.pointerType==="touch"?this._onTouchMove(a):this._onMouseMove(a))}function kr(a){switch(this._removePointer(a),this._pointers.length){case 0:this.domElement.releasePointerCapture(a.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yi),this.state=R.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ir(a){let e;switch(a.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case S.MOUSE.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(a),this.state=R.DOLLY;break;case S.MOUSE.ROTATE:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=R.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=R.ROTATE}break;case S.MOUSE.PAN:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=R.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=R.PAN}break;default:this.state=R.NONE}this.state!==R.NONE&&this.dispatchEvent(Ht)}function Rr(a){switch(this.state){case R.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(a);break;case R.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(a);break;case R.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(a);break}}function Lr(a){this.enabled===!1||this.enableZoom===!1||this.state!==R.NONE||(a.preventDefault(),this.dispatchEvent(Ht),this._handleMouseWheel(this._customWheelEvent(a)),this.dispatchEvent(Yi))}function Ur(a){this.enabled!==!1&&this._handleKeyDown(a)}function Fr(a){switch(this._trackPointer(a),this._pointers.length){case 1:switch(this.touches.ONE){case S.TOUCH.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(a),this.state=R.TOUCH_ROTATE;break;case S.TOUCH.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(a),this.state=R.TOUCH_PAN;break;default:this.state=R.NONE}break;case 2:switch(this.touches.TWO){case S.TOUCH.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(a),this.state=R.TOUCH_DOLLY_PAN;break;case S.TOUCH.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(a),this.state=R.TOUCH_DOLLY_ROTATE;break;default:this.state=R.NONE}break;default:this.state=R.NONE}this.state!==R.NONE&&this.dispatchEvent(Ht)}function zr(a){switch(this._trackPointer(a),this.state){case R.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(a),this.update();break;case R.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(a),this.update();break;case R.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(a),this.update();break;case R.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(a),this.update();break;default:this.state=R.NONE}}function Nr(a){this.enabled!==!1&&a.preventDefault()}function $r(a){a.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Br(a){a.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ee(a){if(a===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function Xi(a,e){a.prototype=Object.create(e.prototype),a.prototype.constructor=a,a.__proto__=e}var ae={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ke={duration:.5,overwrite:!1,delay:0},Kt,W,z,de=1e8,L=1/de,qt=Math.PI*2,Vr=qt/4,Gr=0,Hi=Math.sqrt,jr=Math.cos,Yr=Math.sin,H=function(e){return typeof e=="string"},V=function(e){return typeof e=="function"},we=function(e){return typeof e=="number"},Qt=function(e){return typeof e>"u"},ge=function(e){return typeof e=="object"},ee=function(e){return e!==!1},Jt=function(){return typeof window<"u"},Dt=function(e){return V(e)||H(e)},Wi=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},K=Array.isArray,ei=/(?:-?\.?\d|\.)+/gi,Ki=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,qe=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ti=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,qi=/[+-]=-?[.\d]+/,Qi=/[^,'"\[\]\s]+/gi,Zr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,$,_e,ii,ni,oe={},Mt={},Ji,en=function(e){return(Mt=Je(e,oe))&&ne},ri=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ct=function(e,t){return!t&&console.warn(e)},tn=function(e,t){return e&&(oe[e]=t)&&Mt&&(Mt[e]=t)||oe},ht=function(){return 0},Xr={suppressEvents:!0,isStart:!0,kill:!1},Ot={suppressEvents:!0,kill:!1},Hr={suppressEvents:!0},si={},Ae=[],ai={},nn,le={},oi={},rn=30,kt=[],li="",ci=function(e){var t=e[0],i,n;if(ge(t)||V(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(n=kt.length;n--&&!kt[n].targetTest(t););i=kt[n]}for(n=e.length;n--;)e[n]&&(e[n]._gsap||(e[n]._gsap=new In(e[n],i)))||e.splice(n,1);return e},Ue=function(e){return e._gsap||ci(fe(e))[0]._gsap},sn=function(e,t,i){return(i=e[t])&&V(i)?e[t]():Qt(i)&&e.getAttribute&&e.getAttribute(t)||i},te=function(e,t){return(e=e.split(",")).forEach(t)||e},j=function(e){return Math.round(e*1e5)/1e5||0},Y=function(e){return Math.round(e*1e7)/1e7||0},Qe=function(e,t){var i=t.charAt(0),n=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+n:i==="-"?e-n:i==="*"?e*n:e/n},Wr=function(e,t){for(var i=t.length,n=0;e.indexOf(t[n])<0&&++n<i;);return n<i},It=function(){var e=Ae.length,t=Ae.slice(0),i,n;for(ai={},Ae.length=0,i=0;i<e;i++)n=t[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},hi=function(e){return!!(e._initted||e._startAt||e.add)},an=function(e,t,i,n){Ae.length&&!W&&It(),e.render(t,i,!!(W&&t<0&&hi(e))),Ae.length&&!W&&It()},on=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Qi).length<2?t:H(e)?e.trim():e},ln=function(e){return e},ce=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},Kr=function(e){return function(t,i){for(var n in i)n in t||n==="duration"&&e||n==="ease"||(t[n]=i[n])}},Je=function(e,t){for(var i in t)e[i]=t[i];return e},cn=function a(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=ge(t[i])?a(e[i]||(e[i]={}),t[i]):t[i]);return e},Rt=function(e,t){var i={},n;for(n in e)n in t||(i[n]=e[n]);return i},ut=function(e){var t=e.parent||$,i=e.keyframes?Kr(K(e.keyframes)):ce;if(ee(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},qr=function(e,t){for(var i=e.length,n=i===t.length;n&&i--&&e[i]===t[i];);return i<0},hn=function(e,t,i,n,r){var s=e[n],o;if(r)for(o=t[r];s&&s[r]>o;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[n]=t,t._prev=s,t.parent=t._dp=e,t},Lt=function(e,t,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=t._prev,s=t._next;r?r._next=s:e[i]===t&&(e[i]=s),s?s._prev=r:e[n]===t&&(e[n]=r),t._next=t._prev=t.parent=null},Te=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Fe=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},Qr=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ui=function(e,t,i,n){return e._startAt&&(W?e._startAt.revert(Ot):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,n))},Jr=function a(e){return!e||e._ts&&a(e.parent)},un=function(e){return e._repeat?et(e._tTime,e=e.duration()+e._rDelay)*e:0},et=function(e,t){var i=Math.floor(e=Y(e/t));return e&&i===e?i-1:i},Ut=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ft=function(e){return e._end=Y(e._start+(e._tDur/Math.abs(e._ts||e._rts||L)||0))},zt=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Y(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ft(e),i._dirty||Fe(i,e)),e},dn=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Ut(e.rawTime(),t),(!t._dur||pt(0,t.totalDuration(),i)-t._tTime>L)&&t.render(i,!0)),Fe(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-L}},ye=function(e,t,i,n){return t.parent&&Te(t),t._start=Y((we(i)?i:i||e!==$?pe(e,i,t):e._time)+t._delay),t._end=Y(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),hn(e,t,"_first","_last",e._sort?"_start":0),di(t)||(e._recent=t),n||dn(e,t),e._ts<0&&zt(e,e._tTime),e},pn=function(e,t){return(oe.ScrollTrigger||ri("scrollTrigger",t))&&oe.ScrollTrigger.create(t,e)},fn=function(e,t,i,n,r){if(vi(e,t,r),!e._initted)return 1;if(!i&&e._pt&&!W&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&nn!==ue.frame)return Ae.push(e),e._lazy=[r,n],1},es=function a(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||a(t))},di=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},ts=function(e,t,i,n){var r=e.ratio,s=t<0||!t&&(!e._start&&es(e)&&!(!e._initted&&di(e))||(e._ts<0||e._dp._ts<0)&&!di(e))?0:1,o=e._rDelay,l=0,h,c,u;if(o&&e._repeat&&(l=pt(0,e._tDur,t),c=et(l,o),e._yoyo&&c&1&&(s=1-s),c!==et(e._tTime,o)&&(r=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==r||W||n||e._zTime===L||!t&&e._zTime){if(!e._initted&&fn(e,t,n,i,l))return;for(u=e._zTime,e._zTime=t||(i?L:0),i||(i=t&&!u),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=l,h=e._pt;h;)h.r(s,h.d),h=h._next;t<0&&ui(e,t,i,!0),e._onUpdate&&!i&&he(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&he(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Te(e,1),!i&&!W&&(he(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},is=function(e,t,i){var n;if(i>t)for(n=e._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>t)return n;n=n._next}else for(n=e._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<t)return n;n=n._prev}},tt=function(e,t,i,n){var r=e._repeat,s=Y(t)||0,o=e._tTime/e._tDur;return o&&!n&&(e._time*=s/e._dur),e._dur=s,e._tDur=r?r<0?1e10:Y(s*(r+1)+e._rDelay*r):s,o>0&&!n&&zt(e,e._tTime=e._tDur*o),e.parent&&Ft(e),i||Fe(e.parent,e),e},mn=function(e){return e instanceof Q?Fe(e):tt(e,e._dur)},ns={_start:0,endTime:ht,totalDuration:ht},pe=function a(e,t,i){var n=e.labels,r=e._recent||ns,s=e.duration()>=de?r.endTime(!1):e._dur,o,l,h;return H(t)&&(isNaN(t)||t in n)?(l=t.charAt(0),h=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(h?(o<0?r:i).totalDuration()/100:1)):o<0?(t in n||(n[t]=s),n[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),h&&i&&(l=l/100*(K(i)?i[0]:i).totalDuration()),o>1?a(e,t.substr(0,o-1),i)+l:s+l)):t==null?s:+t},dt=function(e,t,i){var n=we(t[1]),r=(n?2:1)+(e<2?0:1),s=t[r],o,l;if(n&&(s.duration=t[1]),s.parent=i,e){for(o=s,l=i;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=ee(l.vars.inherit)&&l.parent;s.immediateRender=ee(o.immediateRender),e<2?s.runBackwards=1:s.startAt=t[r-1]}return new Z(t[0],s,t[r+1])},De=function(e,t){return e||e===0?t(e):t},pt=function(e,t,i){return i<e?e:i>t?t:i},q=function(e,t){return!H(e)||!(t=Zr.exec(e))?"":t[1]},rs=function(e,t,i){return De(i,function(n){return pt(e,t,n)})},pi=[].slice,gn=function(e,t){return e&&ge(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&ge(e[0]))&&!e.nodeType&&e!==_e},ss=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(n){var r;return H(n)&&!t||gn(n,1)?(r=i).push.apply(r,fe(n)):i.push(n)})||i},fe=function(e,t,i){return z&&!t&&z.selector?z.selector(e):H(e)&&!i&&(ii||!nt())?pi.call((t||ni).querySelectorAll(e),0):K(e)?ss(e,i):gn(e)?pi.call(e,0):e?[e]:[]},fi=function(e){return e=fe(e)[0]||ct("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return fe(t,i.querySelectorAll?i:i===e?ct("Invalid scope")||ni.createElement("div"):e)}},_n=function(e){return e.sort(function(){return .5-Math.random()})},yn=function(e){if(V(e))return e;var t=ge(e)?e:{each:e},i=ze(t.ease),n=t.from||0,r=parseFloat(t.base)||0,s={},o=n>0&&n<1,l=isNaN(n)||o,h=t.axis,c=n,u=n;return H(n)?c=u={center:.5,edges:.5,end:1}[n]||0:!o&&l&&(c=n[0],u=n[1]),function(p,m,f){var d=(f||t).length,g=s[d],_,y,x,b,v,P,w,C,E;if(!g){if(E=t.grid==="auto"?0:(t.grid||[1,de])[1],!E){for(w=-de;w<(w=f[E++].getBoundingClientRect().left)&&E<d;);E<d&&E--}for(g=s[d]=[],_=l?Math.min(E,d)*c-.5:n%E,y=E===de?0:l?d*u/E-.5:n/E|0,w=0,C=de,P=0;P<d;P++)x=P%E-_,b=y-(P/E|0),g[P]=v=h?Math.abs(h==="y"?b:x):Hi(x*x+b*b),v>w&&(w=v),v<C&&(C=v);n==="random"&&_n(g),g.max=w-C,g.min=C,g.v=d=(parseFloat(t.amount)||parseFloat(t.each)*(E>d?d-1:h?h==="y"?d/E:E:Math.max(E,d/E))||0)*(n==="edges"?-1:1),g.b=d<0?r-d:r,g.u=q(t.amount||t.each)||0,i=i&&d<0?Mn(i):i}return d=(g[p]-g.min)/g.max||0,Y(g.b+(i?i(d):d)*g.v)+g.u}},mi=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var n=Y(Math.round(parseFloat(i)/e)*e*t);return(n-n%1)/t+(we(i)?0:q(i))}},xn=function(e,t){var i=K(e),n,r;return!i&&ge(e)&&(n=i=e.radius||de,e.values?(e=fe(e.values),(r=!we(e[0]))&&(n*=n)):e=mi(e.increment)),De(t,i?V(e)?function(s){return r=e(s),Math.abs(r-s)<=n?r:s}:function(s){for(var o=parseFloat(r?s.x:s),l=parseFloat(r?s.y:0),h=de,c=0,u=e.length,p,m;u--;)r?(p=e[u].x-o,m=e[u].y-l,p=p*p+m*m):p=Math.abs(e[u]-o),p<h&&(h=p,c=u);return c=!n||h<=n?e[c]:s,r||c===s||we(s)?c:c+q(s)}:mi(e))},bn=function(e,t,i,n){return De(K(e)?!t:i===!0?!!(i=0):!n,function(){return K(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*n)/n})},as=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(n){return t.reduce(function(r,s){return s(r)},n)}},os=function(e,t){return function(i){return e(parseFloat(i))+(t||q(i))}},ls=function(e,t,i){return En(e,t,0,1,i)},vn=function(e,t,i){return De(i,function(n){return e[~~t(n)]})},cs=function a(e,t,i){var n=t-e;return K(e)?vn(e,a(0,e.length),t):De(i,function(r){return(n+(r-e)%n)%n+e})},hs=function a(e,t,i){var n=t-e,r=n*2;return K(e)?vn(e,a(0,e.length-1),t):De(i,function(s){return s=(r+(s-e)%r)%r||0,e+(s>n?r-s:s)})},ft=function(e){for(var t=0,i="",n,r,s,o;~(n=e.indexOf("random(",t));)s=e.indexOf(")",n),o=e.charAt(n+7)==="[",r=e.substr(n+7,s-n-7).match(o?Qi:ei),i+=e.substr(t,n-t)+bn(o?r:+r[0],o?0:+r[1],+r[2]||1e-5),t=s+1;return i+e.substr(t,e.length-t)},En=function(e,t,i,n,r){var s=t-e,o=n-i;return De(r,function(l){return i+((l-e)/s*o||0)})},us=function a(e,t,i,n){var r=isNaN(e+t)?0:function(m){return(1-m)*e+m*t};if(!r){var s=H(e),o={},l,h,c,u,p;if(i===!0&&(n=1)&&(i=null),s)e={p:e},t={p:t};else if(K(e)&&!K(t)){for(c=[],u=e.length,p=u-2,h=1;h<u;h++)c.push(a(e[h-1],e[h]));u--,r=function(f){f*=u;var d=Math.min(p,~~f);return c[d](f-d)},i=t}else n||(e=Je(K(e)?[]:{},e));if(!c){for(l in t)xi.call(o,e,l,"get",t[l]);r=function(f){return Pi(f,o)||(s?e.p:e)}}}return De(i,r)},wn=function(e,t,i){var n=e.labels,r=de,s,o,l;for(s in n)o=n[s]-t,o<0==!!i&&o&&r>(o=Math.abs(o))&&(l=s,r=o);return l},he=function(e,t,i){var n=e.vars,r=n[t],s=z,o=e._ctx,l,h,c;if(r)return l=n[t+"Params"],h=n.callbackScope||e,i&&Ae.length&&It(),o&&(z=o),c=l?r.apply(h,l):r.call(h),z=s,c},mt=function(e){return Te(e),e.scrollTrigger&&e.scrollTrigger.kill(!!W),e.progress()<1&&he(e,"onInterrupt"),e},it,Pn=[],Cn=function(e){if(e)if(e=!e.name&&e.default||e,Jt()||e.headless){var t=e.name,i=V(e),n=t&&!i&&e.init?function(){this._props=[]}:e,r={init:ht,render:Pi,add:xi,kill:As,modifier:Ss,rawVars:0},s={targetTest:0,get:0,getSetter:wi,aliases:{},register:0};if(nt(),e!==n){if(le[t])return;ce(n,ce(Rt(e,r),s)),Je(n.prototype,Je(r,Rt(e,s))),le[n.prop=t]=n,e.targetTest&&(kt.push(n),si[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}tn(t,n),e.register&&e.register(ne,n,ie)}else Pn.push(e)},U=255,gt={aqua:[0,U,U],lime:[0,U,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,U],navy:[0,0,128],white:[U,U,U],olive:[128,128,0],yellow:[U,U,0],orange:[U,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[U,0,0],pink:[U,192,203],cyan:[0,U,U],transparent:[U,U,U,0]},gi=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*U+.5|0},Sn=function(e,t,i){var n=e?we(e)?[e>>16,e>>8&U,e&U]:0:gt.black,r,s,o,l,h,c,u,p,m,f;if(!n){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),gt[e])n=gt[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),s=e.charAt(2),o=e.charAt(3),e="#"+r+r+s+s+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return n=parseInt(e.substr(1,6),16),[n>>16,n>>8&U,n&U,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),n=[e>>16,e>>8&U,e&U]}else if(e.substr(0,3)==="hsl"){if(n=f=e.match(ei),!t)l=+n[0]%360/360,h=+n[1]/100,c=+n[2]/100,s=c<=.5?c*(h+1):c+h-c*h,r=c*2-s,n.length>3&&(n[3]*=1),n[0]=gi(l+1/3,r,s),n[1]=gi(l,r,s),n[2]=gi(l-1/3,r,s);else if(~e.indexOf("="))return n=e.match(Ki),i&&n.length<4&&(n[3]=1),n}else n=e.match(ei)||gt.transparent;n=n.map(Number)}return t&&!f&&(r=n[0]/U,s=n[1]/U,o=n[2]/U,u=Math.max(r,s,o),p=Math.min(r,s,o),c=(u+p)/2,u===p?l=h=0:(m=u-p,h=c>.5?m/(2-u-p):m/(u+p),l=u===r?(s-o)/m+(s<o?6:0):u===s?(o-r)/m+2:(r-s)/m+4,l*=60),n[0]=~~(l+.5),n[1]=~~(h*100+.5),n[2]=~~(c*100+.5)),i&&n.length<4&&(n[3]=1),n},An=function(e){var t=[],i=[],n=-1;return e.split(Me).forEach(function(r){var s=r.match(qe)||[];t.push.apply(t,s),i.push(n+=s.length+1)}),t.c=i,t},Tn=function(e,t,i){var n="",r=(e+n).match(Me),s=t?"hsla(":"rgba(",o=0,l,h,c,u;if(!r)return e;if(r=r.map(function(p){return(p=Sn(p,t,1))&&s+(t?p[0]+","+p[1]+"%,"+p[2]+"%,"+p[3]:p.join(","))+")"}),i&&(c=An(e),l=i.c,l.join(n)!==c.c.join(n)))for(h=e.replace(Me,"1").split(qe),u=h.length-1;o<u;o++)n+=h[o]+(~l.indexOf(o)?r.shift()||s+"0,0,0,0)":(c.length?c:r.length?r:i).shift());if(!h)for(h=e.split(Me),u=h.length-1;o<u;o++)n+=h[o]+r[o];return n+h[u]},Me=(function(){var a="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in gt)a+="|"+e+"\\b";return new RegExp(a+")","gi")})(),ds=/hsl[a]?\(/,Dn=function(e){var t=e.join(" "),i;if(Me.lastIndex=0,Me.test(t))return i=ds.test(t),e[1]=Tn(e[1],i),e[0]=Tn(e[0],i,An(e[1])),!0},_t,ue=(function(){var a=Date.now,e=500,t=33,i=a(),n=i,r=1e3/240,s=r,o=[],l,h,c,u,p,m,f=function d(g){var _=a()-n,y=g===!0,x,b,v,P;if((_>e||_<0)&&(i+=_-t),n+=_,v=n-i,x=v-s,(x>0||y)&&(P=++u.frame,p=v-u.time*1e3,u.time=v=v/1e3,s+=x+(x>=r?4:r-x),b=1),y||(l=h(d)),b)for(m=0;m<o.length;m++)o[m](v,p,P,g)};return u={time:0,frame:0,tick:function(){f(!0)},deltaRatio:function(g){return p/(1e3/(g||60))},wake:function(){Ji&&(!ii&&Jt()&&(_e=ii=window,ni=_e.document||{},oe.gsap=ne,(_e.gsapVersions||(_e.gsapVersions=[])).push(ne.version),en(Mt||_e.GreenSockGlobals||!_e.gsap&&_e||{}),Pn.forEach(Cn)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),h=c||function(g){return setTimeout(g,s-u.time*1e3+1|0)},_t=1,f(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(l),_t=0,h=ht},lagSmoothing:function(g,_){e=g||1/0,t=Math.min(_||33,e)},fps:function(g){r=1e3/(g||240),s=u.time*1e3+r},add:function(g,_,y){var x=_?function(b,v,P,w){g(b,v,P,w),u.remove(x)}:g;return u.remove(g),o[y?"unshift":"push"](x),nt(),x},remove:function(g,_){~(_=o.indexOf(g))&&o.splice(_,1)&&m>=_&&m--},_listeners:o},u})(),nt=function(){return!_t&&ue.wake()},D={},ps=/^[\d.\-M][\d.\-,\s]/,fs=/["']/g,ms=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),n=i[0],r=1,s=i.length,o,l,h;r<s;r++)l=i[r],o=r!==s-1?l.lastIndexOf(","):l.length,h=l.substr(0,o),t[n]=isNaN(h)?h.replace(fs,"").trim():+h,n=l.substr(o+1).trim();return t},gs=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),n=e.indexOf("(",t);return e.substring(t,~n&&n<i?e.indexOf(")",i+1):i)},_s=function(e){var t=(e+"").split("("),i=D[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[ms(t[1])]:gs(e).split(",").map(on)):D._CE&&ps.test(e)?D._CE("",e):i},Mn=function(e){return function(t){return 1-e(1-t)}},On=function a(e,t){for(var i=e._first,n;i;)i instanceof Q?a(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?a(i.timeline,t):(n=i._ease,i._ease=i._yEase,i._yEase=n,i._yoyo=t)),i=i._next},ze=function(e,t){return e&&(V(e)?e:D[e]||_s(e))||t},Ne=function(e,t,i,n){i===void 0&&(i=function(l){return 1-t(1-l)}),n===void 0&&(n=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var r={easeIn:t,easeOut:i,easeInOut:n},s;return te(e,function(o){D[o]=oe[o]=r,D[s=o.toLowerCase()]=i;for(var l in r)D[s+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=D[o+"."+l]=r[l]}),r},kn=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},_i=function a(e,t,i){var n=t>=1?t:1,r=(i||(e?.3:.45))/(t<1?t:1),s=r/qt*(Math.asin(1/n)||0),o=function(c){return c===1?1:n*Math.pow(2,-10*c)*Yr((c-s)*r)+1},l=e==="out"?o:e==="in"?function(h){return 1-o(1-h)}:kn(o);return r=qt/r,l.config=function(h,c){return a(e,h,c)},l},yi=function a(e,t){t===void 0&&(t=1.70158);var i=function(s){return s?--s*s*((t+1)*s+t)+1:0},n=e==="out"?i:e==="in"?function(r){return 1-i(1-r)}:kn(i);return n.config=function(r){return a(e,r)},n};te("Linear,Quad,Cubic,Quart,Quint,Strong",function(a,e){var t=e<5?e+1:e;Ne(a+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})}),D.Linear.easeNone=D.none=D.Linear.easeIn,Ne("Elastic",_i("in"),_i("out"),_i()),(function(a,e){var t=1/e,i=2*t,n=2.5*t,r=function(o){return o<t?a*o*o:o<i?a*Math.pow(o-1.5/e,2)+.75:o<n?a*(o-=2.25/e)*o+.9375:a*Math.pow(o-2.625/e,2)+.984375};Ne("Bounce",function(s){return 1-r(1-s)},r)})(7.5625,2.75),Ne("Expo",function(a){return Math.pow(2,10*(a-1))*a+a*a*a*a*a*a*(1-a)}),Ne("Circ",function(a){return-(Hi(1-a*a)-1)}),Ne("Sine",function(a){return a===1?1:-jr(a*Vr)+1}),Ne("Back",yi("in"),yi("out"),yi()),D.SteppedEase=D.steps=oe.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,n=e+(t?0:1),r=t?1:0,s=1-L;return function(o){return((n*pt(0,s,o)|0)+r)*i}}},Ke.ease=D["quad.out"],te("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(a){return li+=a+","+a+"Params,"});var In=function(e,t){this.id=Gr++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:sn,this.set=t?t.getSetter:wi},yt=(function(){function a(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,tt(this,+t.duration,1,1),this.data=t.data,z&&(this._ctx=z,z.data.push(this)),_t||ue.wake()}var e=a.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,tt(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,n){if(nt(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(zt(this,i),!r._dp||r.parent||dn(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ye(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===L||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),an(this,i,n)),this},e.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+un(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},e.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+un(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,n){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,n):this._repeat?et(this._tTime,r)+1:1},e.timeScale=function(i,n){if(!arguments.length)return this._rts===-L?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?Ut(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-L?0:this._rts,this.totalTime(pt(-Math.abs(this._delay),this.totalDuration(),r),n!==!1),Ft(this),Qr(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(nt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==L&&(this._tTime-=L)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&ye(n,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+(ee(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ut(n.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=Hr);var n=W;return W=i,hi(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),W=n,this},e.globalTime=function(i){for(var n=this,r=arguments.length?i:n.rawTime();n;)r=n._start+r/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,mn(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,mn(this),n?this.time(n):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,n){return this.totalTime(pe(this,i),ee(n))},e.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,ee(n)),this._dur||(this._zTime=-L),this},e.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},e.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},e.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-L:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-L,this},e.isActive=function(){var i=this.parent||this._dp,n=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=n&&r<this.endTime(!0)-L)},e.eventCallback=function(i,n,r){var s=this.vars;return arguments.length>1?(n?(s[i]=n,r&&(s[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=n)):delete s[i],this):s[i]},e.then=function(i){var n=this;return new Promise(function(r){var s=V(i)?i:ln,o=function(){var h=n.then;n.then=null,V(s)&&(s=s(n))&&(s.then||s===n)&&(n.then=h),r(s),n.then=h};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?o():n._prom=o})},e.kill=function(){mt(this)},a})();ce(yt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-L,_prom:0,_ps:!1,_rts:1});var Q=(function(a){Xi(e,a);function e(i,n){var r;return i===void 0&&(i={}),r=a.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=ee(i.sortChildren),$&&ye(i.parent||$,Ee(r),n),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&pn(Ee(r),i.scrollTrigger),r}var t=e.prototype;return t.to=function(n,r,s){return dt(0,arguments,this),this},t.from=function(n,r,s){return dt(1,arguments,this),this},t.fromTo=function(n,r,s,o){return dt(2,arguments,this),this},t.set=function(n,r,s){return r.duration=0,r.parent=this,ut(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Z(n,r,pe(this,s),1),this},t.call=function(n,r,s){return ye(this,Z.delayedCall(0,n,r),s)},t.staggerTo=function(n,r,s,o,l,h,c){return s.duration=r,s.stagger=s.stagger||o,s.onComplete=h,s.onCompleteParams=c,s.parent=this,new Z(n,s,pe(this,l)),this},t.staggerFrom=function(n,r,s,o,l,h,c){return s.runBackwards=1,ut(s).immediateRender=ee(s.immediateRender),this.staggerTo(n,r,s,o,l,h,c)},t.staggerFromTo=function(n,r,s,o,l,h,c,u){return o.startAt=s,ut(o).immediateRender=ee(o.immediateRender),this.staggerTo(n,r,o,l,h,c,u)},t.render=function(n,r,s){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,h=this._dur,c=n<=0?0:Y(n),u=this._zTime<0!=n<0&&(this._initted||!h),p,m,f,d,g,_,y,x,b,v,P,w;if(this!==$&&c>l&&n>=0&&(c=l),c!==this._tTime||s||u){if(o!==this._time&&h&&(c+=this._time-o,n+=this._time-o),p=c,b=this._start,x=this._ts,_=!x,u&&(h||(o=this._zTime),(n||!r)&&(this._zTime=n)),this._repeat){if(P=this._yoyo,g=h+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(g*100+n,r,s);if(p=Y(c%g),c===l?(d=this._repeat,p=h):(v=Y(c/g),d=~~v,d&&d===v&&(p=h,d--),p>h&&(p=h)),v=et(this._tTime,g),!o&&this._tTime&&v!==d&&this._tTime-v*g-this._dur<=0&&(v=d),P&&d&1&&(p=h-p,w=1),d!==v&&!this._lock){var C=P&&v&1,E=C===(P&&d&1);if(d<v&&(C=!C),o=C?0:c%h?h:c,this._lock=1,this.render(o||(w?0:Y(d*g)),r,!h)._lock=0,this._tTime=c,!r&&this.parent&&he(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1),o&&o!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(h=this._dur,l=this._tDur,E&&(this._lock=2,o=C?h:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!_)return this;On(this,w)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=is(this,Y(o),Y(p)),y&&(c-=p-(p=y._start))),this._tTime=c,this._time=p,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,o=0),!o&&c&&!r&&!v&&(he(this,"onStart"),this._tTime!==c))return this;if(p>=o&&n>=0)for(m=this._first;m;){if(f=m._next,(m._act||p>=m._start)&&m._ts&&y!==m){if(m.parent!==this)return this.render(n,r,s);if(m.render(m._ts>0?(p-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(p-m._start)*m._ts,r,s),p!==this._time||!this._ts&&!_){y=0,f&&(c+=this._zTime=-L);break}}m=f}else{m=this._last;for(var T=n<0?n:p;m;){if(f=m._prev,(m._act||T<=m._end)&&m._ts&&y!==m){if(m.parent!==this)return this.render(n,r,s);if(m.render(m._ts>0?(T-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(T-m._start)*m._ts,r,s||W&&hi(m)),p!==this._time||!this._ts&&!_){y=0,f&&(c+=this._zTime=T?-L:L);break}}m=f}}if(y&&!r&&(this.pause(),y.render(p>=o?0:-L)._zTime=p>=o?1:-1,this._ts))return this._start=b,Ft(this),this.render(n,r,s);this._onUpdate&&!r&&he(this,"onUpdate",!0),(c===l&&this._tTime>=this.totalDuration()||!c&&o)&&(b===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((n||!h)&&(c===l&&this._ts>0||!c&&this._ts<0)&&Te(this,1),!r&&!(n<0&&!o)&&(c||o||!l)&&(he(this,c===l&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(n,r){var s=this;if(we(r)||(r=pe(this,r,n)),!(n instanceof yt)){if(K(n))return n.forEach(function(o){return s.add(o,r)}),this;if(H(n))return this.addLabel(n,r);if(V(n))n=Z.delayedCall(0,n);else return this}return this!==n?ye(this,n,r):this},t.getChildren=function(n,r,s,o){n===void 0&&(n=!0),r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=-de);for(var l=[],h=this._first;h;)h._start>=o&&(h instanceof Z?r&&l.push(h):(s&&l.push(h),n&&l.push.apply(l,h.getChildren(!0,r,s)))),h=h._next;return l},t.getById=function(n){for(var r=this.getChildren(1,1,1),s=r.length;s--;)if(r[s].vars.id===n)return r[s]},t.remove=function(n){return H(n)?this.removeLabel(n):V(n)?this.killTweensOf(n):(n.parent===this&&Lt(this,n),n===this._recent&&(this._recent=this._last),Fe(this))},t.totalTime=function(n,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Y(ue.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),a.prototype.totalTime.call(this,n,r),this._forcing=0,this):this._tTime},t.addLabel=function(n,r){return this.labels[n]=pe(this,r),this},t.removeLabel=function(n){return delete this.labels[n],this},t.addPause=function(n,r,s){var o=Z.delayedCall(0,r||ht,s);return o.data="isPause",this._hasPause=1,ye(this,o,pe(this,n))},t.removePause=function(n){var r=this._first;for(n=pe(this,n);r;)r._start===n&&r.data==="isPause"&&Te(r),r=r._next},t.killTweensOf=function(n,r,s){for(var o=this.getTweensOf(n,s),l=o.length;l--;)Oe!==o[l]&&o[l].kill(n,r);return this},t.getTweensOf=function(n,r){for(var s=[],o=fe(n),l=this._first,h=we(r),c;l;)l instanceof Z?Wr(l._targets,o)&&(h?(!Oe||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&s.push(l):(c=l.getTweensOf(o,r)).length&&s.push.apply(s,c),l=l._next;return s},t.tweenTo=function(n,r){r=r||{};var s=this,o=pe(s,n),l=r,h=l.startAt,c=l.onStart,u=l.onStartParams,p=l.immediateRender,m,f=Z.to(s,ce({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(h&&"time"in h?h.time:s._time))/s.timeScale())||L,onStart:function(){if(s.pause(),!m){var g=r.duration||Math.abs((o-(h&&"time"in h?h.time:s._time))/s.timeScale());f._dur!==g&&tt(f,g,0,1).render(f._time,!0,!0),m=1}c&&c.apply(f,u||[])}},r));return p?f.render(0):f},t.tweenFromTo=function(n,r,s){return this.tweenTo(r,ce({startAt:{time:pe(this,n)}},s))},t.recent=function(){return this._recent},t.nextLabel=function(n){return n===void 0&&(n=this._time),wn(this,pe(this,n))},t.previousLabel=function(n){return n===void 0&&(n=this._time),wn(this,pe(this,n),1)},t.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+L)},t.shiftChildren=function(n,r,s){s===void 0&&(s=0);for(var o=this._first,l=this.labels,h;o;)o._start>=s&&(o._start+=n,o._end+=n),o=o._next;if(r)for(h in l)l[h]>=s&&(l[h]+=n);return Fe(this)},t.invalidate=function(n){var r=this._first;for(this._lock=0;r;)r.invalidate(n),r=r._next;return a.prototype.invalidate.call(this,n)},t.clear=function(n){n===void 0&&(n=!0);for(var r=this._first,s;r;)s=r._next,this.remove(r),r=s;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),Fe(this)},t.totalDuration=function(n){var r=0,s=this,o=s._last,l=de,h,c,u;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-n:n));if(s._dirty){for(u=s.parent;o;)h=o._prev,o._dirty&&o.totalDuration(),c=o._start,c>l&&s._sort&&o._ts&&!s._lock?(s._lock=1,ye(s,o,c-o._delay,1)._lock=0):l=c,c<0&&o._ts&&(r-=c,(!u&&!s._dp||u&&u.smoothChildTiming)&&(s._start+=c/s._ts,s._time-=c,s._tTime-=c),s.shiftChildren(-c,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=h;tt(s,s===$&&s._time>r?s._time:r,1,1),s._dirty=0}return s._tDur},e.updateRoot=function(n){if($._ts&&(an($,Ut(n,$)),nn=ue.frame),ue.frame>=rn){rn+=ae.autoSleep||120;var r=$._first;if((!r||!r._ts)&&ae.autoSleep&&ue._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||ue.sleep()}}},e})(yt);ce(Q.prototype,{_lock:0,_hasPause:0,_forcing:0});var ys=function(e,t,i,n,r,s,o){var l=new ie(this._pt,e,t,0,1,Nn,null,r),h=0,c=0,u,p,m,f,d,g,_,y;for(l.b=i,l.e=n,i+="",n+="",(_=~n.indexOf("random("))&&(n=ft(n)),s&&(y=[i,n],s(y,e,t),i=y[0],n=y[1]),p=i.match(ti)||[];u=ti.exec(n);)f=u[0],d=n.substring(h,u.index),m?m=(m+1)%5:d.substr(-5)==="rgba("&&(m=1),f!==p[c++]&&(g=parseFloat(p[c-1])||0,l._pt={_next:l._pt,p:d||c===1?d:",",s:g,c:f.charAt(1)==="="?Qe(g,f)-g:parseFloat(f)-g,m:m&&m<4?Math.round:0},h=ti.lastIndex);return l.c=h<n.length?n.substring(h,n.length):"",l.fp=o,(qi.test(n)||_)&&(l.e=0),this._pt=l,l},xi=function(e,t,i,n,r,s,o,l,h,c){V(n)&&(n=n(r||0,e,s));var u=e[t],p=i!=="get"?i:V(u)?h?e[t.indexOf("set")||!V(e["get"+t.substr(3)])?t:"get"+t.substr(3)](h):e[t]():u,m=V(u)?h?ws:Fn:Ei,f;if(H(n)&&(~n.indexOf("random(")&&(n=ft(n)),n.charAt(1)==="="&&(f=Qe(p,n)+(q(p)||0),(f||f===0)&&(n=f))),!c||p!==n||bi)return!isNaN(p*n)&&n!==""?(f=new ie(this._pt,e,t,+p||0,n-(p||0),typeof u=="boolean"?Cs:zn,0,m),h&&(f.fp=h),o&&f.modifier(o,this,e),this._pt=f):(!u&&!(t in e)&&ri(t,n),ys.call(this,e,t,p,n,m,l||ae.stringFilter,h))},xs=function(e,t,i,n,r){if(V(e)&&(e=xt(e,r,t,i,n)),!ge(e)||e.style&&e.nodeType||K(e)||Wi(e))return H(e)?xt(e,r,t,i,n):e;var s={},o;for(o in e)s[o]=xt(e[o],r,t,i,n);return s},Rn=function(e,t,i,n,r,s){var o,l,h,c;if(le[e]&&(o=new le[e]).init(r,o.rawVars?t[e]:xs(t[e],n,r,s,i),i,n,s)!==!1&&(i._pt=l=new ie(i._pt,r,e,0,1,o.render,o,0,o.priority),i!==it))for(h=i._ptLookup[i._targets.indexOf(r)],c=o._props.length;c--;)h[o._props[c]]=l;return o},Oe,bi,vi=function a(e,t,i){var n=e.vars,r=n.ease,s=n.startAt,o=n.immediateRender,l=n.lazy,h=n.onUpdate,c=n.runBackwards,u=n.yoyoEase,p=n.keyframes,m=n.autoRevert,f=e._dur,d=e._startAt,g=e._targets,_=e.parent,y=_&&_.data==="nested"?_.vars.targets:g,x=e._overwrite==="auto"&&!Kt,b=e.timeline,v,P,w,C,E,T,O,A,k,I,G,N,F;if(b&&(!p||!r)&&(r="none"),e._ease=ze(r,Ke.ease),e._yEase=u?Mn(ze(u===!0?r:u,Ke.ease)):0,u&&e._yoyo&&!e._repeat&&(u=e._yEase,e._yEase=e._ease,e._ease=u),e._from=!b&&!!n.runBackwards,!b||p&&!n.stagger){if(A=g[0]?Ue(g[0]).harness:0,N=A&&n[A.prop],v=Rt(n,si),d&&(d._zTime<0&&d.progress(1),t<0&&c&&o&&!m?d.render(-1,!0):d.revert(c&&f?Ot:Xr),d._lazy=0),s){if(Te(e._startAt=Z.set(g,ce({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!d&&ee(l),startAt:null,delay:0,onUpdate:h&&function(){return he(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(W||!o&&!m)&&e._startAt.revert(Ot),o&&f&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&f&&!d){if(t&&(o=!1),w=ce({overwrite:!1,data:"isFromStart",lazy:o&&!d&&ee(l),immediateRender:o,stagger:0,parent:_},v),N&&(w[A.prop]=N),Te(e._startAt=Z.set(g,w)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(W?e._startAt.revert(Ot):e._startAt.render(-1,!0)),e._zTime=t,!o)a(e._startAt,L,L);else if(!t)return}for(e._pt=e._ptCache=0,l=f&&ee(l)||l&&!f,P=0;P<g.length;P++){if(E=g[P],O=E._gsap||ci(g)[P]._gsap,e._ptLookup[P]=I={},ai[O.id]&&Ae.length&&It(),G=y===g?P:y.indexOf(E),A&&(k=new A).init(E,N||v,e,G,y)!==!1&&(e._pt=C=new ie(e._pt,E,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(se){I[se]=C}),k.priority&&(T=1)),!A||N)for(w in v)le[w]&&(k=Rn(w,v,e,G,E,y))?k.priority&&(T=1):I[w]=C=xi.call(e,E,w,"get",v[w],G,y,0,n.stringFilter);e._op&&e._op[P]&&e.kill(E,e._op[P]),x&&e._pt&&(Oe=e,$.killTweensOf(E,I,e.globalTime(t)),F=!e.parent,Oe=0),e._pt&&l&&(ai[O.id]=1)}T&&$n(e),e._onInit&&e._onInit(e)}e._onUpdate=h,e._initted=(!e._op||e._pt)&&!F,p&&t<=0&&b.render(de,!0,!0)},bs=function(e,t,i,n,r,s,o,l){var h=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,u,p,m;if(!h)for(h=e._ptCache[t]=[],p=e._ptLookup,m=e._targets.length;m--;){if(c=p[m][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return bi=1,e.vars[t]="+=0",vi(e,o),bi=0,l?ct(t+" not eligible for reset"):1;h.push(c)}for(m=h.length;m--;)u=h[m],c=u._pt||u,c.s=(n||n===0)&&!r?n:c.s+(n||0)+s*c.c,c.c=i-c.s,u.e&&(u.e=j(i)+q(u.e)),u.b&&(u.b=c.s+q(u.b))},vs=function(e,t){var i=e[0]?Ue(e[0]).harness:0,n=i&&i.aliases,r,s,o,l;if(!n)return t;r=Je({},t);for(s in n)if(s in r)for(l=n[s].split(","),o=l.length;o--;)r[l[o]]=r[s];return r},Es=function(e,t,i,n){var r=t.ease||n||"power1.inOut",s,o;if(K(t))o=i[e]||(i[e]=[]),t.forEach(function(l,h){return o.push({t:h/(t.length-1)*100,v:l,e:r})});else for(s in t)o=i[s]||(i[s]=[]),s==="ease"||o.push({t:parseFloat(e),v:t[s],e:r})},xt=function(e,t,i,n,r){return V(e)?e.call(t,i,n,r):H(e)&&~e.indexOf("random(")?ft(e):e},Ln=li+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Un={};te(Ln+",id,stagger,delay,duration,paused,scrollTrigger",function(a){return Un[a]=1});var Z=(function(a){Xi(e,a);function e(i,n,r,s){var o;typeof n=="number"&&(r.duration=n,n=r,r=null),o=a.call(this,s?n:ut(n))||this;var l=o.vars,h=l.duration,c=l.delay,u=l.immediateRender,p=l.stagger,m=l.overwrite,f=l.keyframes,d=l.defaults,g=l.scrollTrigger,_=l.yoyoEase,y=n.parent||$,x=(K(i)||Wi(i)?we(i[0]):"length"in n)?[i]:fe(i),b,v,P,w,C,E,T,O;if(o._targets=x.length?ci(x):ct("GSAP target "+i+" not found. https://gsap.com",!ae.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=m,f||p||Dt(h)||Dt(c)){if(n=o.vars,b=o.timeline=new Q({data:"nested",defaults:d||{},targets:y&&y.data==="nested"?y.vars.targets:x}),b.kill(),b.parent=b._dp=Ee(o),b._start=0,p||Dt(h)||Dt(c)){if(w=x.length,T=p&&yn(p),ge(p))for(C in p)~Ln.indexOf(C)&&(O||(O={}),O[C]=p[C]);for(v=0;v<w;v++)P=Rt(n,Un),P.stagger=0,_&&(P.yoyoEase=_),O&&Je(P,O),E=x[v],P.duration=+xt(h,Ee(o),v,E,x),P.delay=(+xt(c,Ee(o),v,E,x)||0)-o._delay,!p&&w===1&&P.delay&&(o._delay=c=P.delay,o._start+=c,P.delay=0),b.to(E,P,T?T(v,E,x):0),b._ease=D.none;b.duration()?h=c=0:o.timeline=0}else if(f){ut(ce(b.vars.defaults,{ease:"none"})),b._ease=ze(f.ease||n.ease||"none");var A=0,k,I,G;if(K(f))f.forEach(function(N){return b.to(x,N,">")}),b.duration();else{P={};for(C in f)C==="ease"||C==="easeEach"||Es(C,f[C],P,f.easeEach);for(C in P)for(k=P[C].sort(function(N,F){return N.t-F.t}),A=0,v=0;v<k.length;v++)I=k[v],G={ease:I.e,duration:(I.t-(v?k[v-1].t:0))/100*h},G[C]=I.v,b.to(x,G,A),A+=G.duration;b.duration()<h&&b.to({},{duration:h-b.duration()})}}h||o.duration(h=b.duration())}else o.timeline=0;return m===!0&&!Kt&&(Oe=Ee(o),$.killTweensOf(x),Oe=0),ye(y,Ee(o),r),n.reversed&&o.reverse(),n.paused&&o.paused(!0),(u||!h&&!f&&o._start===Y(y._time)&&ee(u)&&Jr(Ee(o))&&y.data!=="nested")&&(o._tTime=-L,o.render(Math.max(0,-c)||0)),g&&pn(Ee(o),g),o}var t=e.prototype;return t.render=function(n,r,s){var o=this._time,l=this._tDur,h=this._dur,c=n<0,u=n>l-L&&!c?l:n<L?0:n,p,m,f,d,g,_,y,x,b;if(!h)ts(this,n,r,s);else if(u!==this._tTime||!n||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(p=u,x=this.timeline,this._repeat){if(d=h+this._rDelay,this._repeat<-1&&c)return this.totalTime(d*100+n,r,s);if(p=Y(u%d),u===l?(f=this._repeat,p=h):(g=Y(u/d),f=~~g,f&&f===g?(p=h,f--):p>h&&(p=h)),_=this._yoyo&&f&1,_&&(b=this._yEase,p=h-p),g=et(this._tTime,d),p===o&&!s&&this._initted&&f===g)return this._tTime=u,this;f!==g&&(x&&this._yEase&&On(x,_),this.vars.repeatRefresh&&!_&&!this._lock&&p!==d&&this._initted&&(this._lock=s=1,this.render(Y(d*f),!0).invalidate()._lock=0))}if(!this._initted){if(fn(this,c?n:p,s,r,u))return this._tTime=0,this;if(o!==this._time&&!(s&&this.vars.repeatRefresh&&f!==g))return this;if(h!==this._dur)return this.render(n,r,s)}if(this._tTime=u,this._time=p,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(b||this._ease)(p/h),this._from&&(this.ratio=y=1-y),!o&&u&&!r&&!g&&(he(this,"onStart"),this._tTime!==u))return this;for(m=this._pt;m;)m.r(y,m.d),m=m._next;x&&x.render(n<0?n:x._dur*x._ease(p/this._dur),r,s)||this._startAt&&(this._zTime=n),this._onUpdate&&!r&&(c&&ui(this,n,r,s),he(this,"onUpdate")),this._repeat&&f!==g&&this.vars.onRepeat&&!r&&this.parent&&he(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(c&&!this._onUpdate&&ui(this,n,!0,!0),(n||!h)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Te(this,1),!r&&!(c&&!o)&&(u||o||_)&&(he(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),a.prototype.invalidate.call(this,n)},t.resetTo=function(n,r,s,o,l){_t||ue.wake(),this._ts||this.play();var h=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||vi(this,h),c=this._ease(h/this._dur),bs(this,n,r,s,o,c,h,l)?this.resetTo(n,r,s,o,1):(zt(this,0),this.parent||hn(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(n,r){if(r===void 0&&(r="all"),!n&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?mt(this):this.scrollTrigger&&this.scrollTrigger.kill(!!W),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(n,r,Oe&&Oe.vars.overwrite!==!0)._first||mt(this),this.parent&&s!==this.timeline.totalDuration()&&tt(this,this._dur*this.timeline._tDur/s,0,1),this}var o=this._targets,l=n?fe(n):o,h=this._ptLookup,c=this._pt,u,p,m,f,d,g,_;if((!r||r==="all")&&qr(o,l))return r==="all"&&(this._pt=0),mt(this);for(u=this._op=this._op||[],r!=="all"&&(H(r)&&(d={},te(r,function(y){return d[y]=1}),r=d),r=vs(o,r)),_=o.length;_--;)if(~l.indexOf(o[_])){p=h[_],r==="all"?(u[_]=r,f=p,m={}):(m=u[_]=u[_]||{},f=r);for(d in f)g=p&&p[d],g&&((!("kill"in g.d)||g.d.kill(d)===!0)&&Lt(this,g,"_pt"),delete p[d]),m!=="all"&&(m[d]=1)}return this._initted&&!this._pt&&c&&mt(this),this},e.to=function(n,r){return new e(n,r,arguments[2])},e.from=function(n,r){return dt(1,arguments)},e.delayedCall=function(n,r,s,o){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:r,onReverseComplete:r,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:o})},e.fromTo=function(n,r,s){return dt(2,arguments)},e.set=function(n,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(n,r)},e.killTweensOf=function(n,r,s){return $.killTweensOf(n,r,s)},e})(yt);ce(Z.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),te("staggerTo,staggerFrom,staggerFromTo",function(a){Z[a]=function(){var e=new Q,t=pi.call(arguments,0);return t.splice(a==="staggerFromTo"?5:4,0,0),e[a].apply(e,t)}});var Ei=function(e,t,i){return e[t]=i},Fn=function(e,t,i){return e[t](i)},ws=function(e,t,i,n){return e[t](n.fp,i)},Ps=function(e,t,i){return e.setAttribute(t,i)},wi=function(e,t){return V(e[t])?Fn:Qt(e[t])&&e.setAttribute?Ps:Ei},zn=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Cs=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Nn=function(e,t){var i=t._pt,n="";if(!e&&t.b)n=t.b;else if(e===1&&t.e)n=t.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+n,i=i._next;n+=t.c}t.set(t.t,t.p,n,t)},Pi=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},Ss=function(e,t,i,n){for(var r=this._pt,s;r;)s=r._next,r.p===n&&r.modifier(e,t,i),r=s},As=function(e){for(var t=this._pt,i,n;t;)n=t._next,t.p===e&&!t.op||t.op===e?Lt(this,t,"_pt"):t.dep||(i=1),t=n;return!i},Ts=function(e,t,i,n){n.mSet(e,t,n.m.call(n.tween,i,n.mt),n)},$n=function(e){for(var t=e._pt,i,n,r,s;t;){for(i=t._next,n=r;n&&n.pr>t.pr;)n=n._next;(t._prev=n?n._prev:s)?t._prev._next=t:r=t,(t._next=n)?n._prev=t:s=t,t=i}e._pt=r},ie=(function(){function a(t,i,n,r,s,o,l,h,c){this.t=i,this.s=r,this.c=s,this.p=n,this.r=o||zn,this.d=l||this,this.set=h||Ei,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=a.prototype;return e.modifier=function(i,n,r){this.mSet=this.mSet||this.set,this.set=Ts,this.m=i,this.mt=r,this.tween=n},a})();te(li+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(a){return si[a]=1}),oe.TweenMax=oe.TweenLite=Z,oe.TimelineLite=oe.TimelineMax=Q,$=new Q({sortChildren:!1,defaults:Ke,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),ae.stringFilter=Dn;var $e=[],Nt={},Ds=[],Bn=0,Ms=0,Ci=function(e){return(Nt[e]||Ds).map(function(t){return t()})},Si=function(){var e=Date.now(),t=[];e-Bn>2&&(Ci("matchMediaInit"),$e.forEach(function(i){var n=i.queries,r=i.conditions,s,o,l,h;for(o in n)s=_e.matchMedia(n[o]).matches,s&&(l=1),s!==r[o]&&(r[o]=s,h=1);h&&(i.revert(),l&&t.push(i))}),Ci("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(n){return i.add(null,n)})}),Bn=e,Ci("matchMedia"))},Vn=(function(){function a(t,i){this.selector=i&&fi(i),this.data=[],this._r=[],this.isReverted=!1,this.id=Ms++,t&&this.add(t)}var e=a.prototype;return e.add=function(i,n,r){V(i)&&(r=n,n=i,i=V);var s=this,o=function(){var h=z,c=s.selector,u;return h&&h!==s&&h.data.push(s),r&&(s.selector=fi(r)),z=s,u=n.apply(s,arguments),V(u)&&s._r.push(u),z=h,s.selector=c,s.isReverted=!1,u};return s.last=o,i===V?o(s,function(l){return s.add(null,l)}):i?s[i]=o:o},e.ignore=function(i){var n=z;z=null,i(this),z=n},e.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof a?i.push.apply(i,n.getTweens()):n instanceof Z&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,n){var r=this;if(i?(function(){for(var o=r.getTweens(),l=r.data.length,h;l--;)h=r.data[l],h.data==="isFlip"&&(h.revert(),h.getChildren(!0,!0,!1).forEach(function(c){return o.splice(o.indexOf(c),1)}));for(o.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,u){return u.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),l=r.data.length;l--;)h=r.data[l],h instanceof Q?h.data!=="nested"&&(h.scrollTrigger&&h.scrollTrigger.revert(),h.kill()):!(h instanceof Z)&&h.revert&&h.revert(i);r._r.forEach(function(c){return c(i,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),n)for(var s=$e.length;s--;)$e[s].id===this.id&&$e.splice(s,1)},e.revert=function(i){this.kill(i||{})},a})(),Os=(function(){function a(t){this.contexts=[],this.scope=t,z&&z.data.push(this)}var e=a.prototype;return e.add=function(i,n,r){ge(i)||(i={matches:i});var s=new Vn(0,r||this.scope),o=s.conditions={},l,h,c;z&&!s.selector&&(s.selector=z.selector),this.contexts.push(s),n=s.add("onMatch",n),s.queries=i;for(h in i)h==="all"?c=1:(l=_e.matchMedia(i[h]),l&&($e.indexOf(s)<0&&$e.push(s),(o[h]=l.matches)&&(c=1),l.addListener?l.addListener(Si):l.addEventListener("change",Si)));return c&&n(s,function(u){return s.add(null,u)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},a})(),$t={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(n){return Cn(n)})},timeline:function(e){return new Q(e)},getTweensOf:function(e,t){return $.getTweensOf(e,t)},getProperty:function(e,t,i,n){H(e)&&(e=fe(e)[0]);var r=Ue(e||{}).get,s=i?ln:on;return i==="native"&&(i=""),e&&(t?s((le[t]&&le[t].get||r)(e,t,i,n)):function(o,l,h){return s((le[o]&&le[o].get||r)(e,o,l,h))})},quickSetter:function(e,t,i){if(e=fe(e),e.length>1){var n=e.map(function(c){return ne.quickSetter(c,t,i)}),r=n.length;return function(c){for(var u=r;u--;)n[u](c)}}e=e[0]||{};var s=le[t],o=Ue(e),l=o.harness&&(o.harness.aliases||{})[t]||t,h=s?function(c){var u=new s;it._pt=0,u.init(e,i?c+i:c,it,0,[e]),u.render(1,u),it._pt&&Pi(1,it)}:o.set(e,l);return s?h:function(c){return h(e,l,i?c+i:c,o,1)}},quickTo:function(e,t,i){var n,r=ne.to(e,ce((n={},n[t]="+=0.1",n.paused=!0,n.stagger=0,n),i||{})),s=function(l,h,c){return r.resetTo(t,l,h,c)};return s.tween=r,s},isTweening:function(e){return $.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ze(e.ease,Ke.ease)),cn(Ke,e||{})},config:function(e){return cn(ae,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,n=e.plugins,r=e.defaults,s=e.extendTimeline;(n||"").split(",").forEach(function(o){return o&&!le[o]&&!oe[o]&&ct(t+" effect requires "+o+" plugin.")}),oi[t]=function(o,l,h){return i(fe(o),ce(l||{},r),h)},s&&(Q.prototype[t]=function(o,l,h){return this.add(oi[t](o,ge(l)?l:(h=l)&&{},this),h)})},registerEase:function(e,t){D[e]=ze(t)},parseEase:function(e,t){return arguments.length?ze(e,t):D},getById:function(e){return $.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new Q(e),n,r;for(i.smoothChildTiming=ee(e.smoothChildTiming),$.remove(i),i._dp=0,i._time=i._tTime=$._time,n=$._first;n;)r=n._next,(t||!(!n._dur&&n instanceof Z&&n.vars.onComplete===n._targets[0]))&&ye(i,n,n._start-n._delay),n=r;return ye($,i,0),i},context:function(e,t){return e?new Vn(e,t):z},matchMedia:function(e){return new Os(e)},matchMediaRefresh:function(){return $e.forEach(function(e){var t=e.conditions,i,n;for(n in t)t[n]&&(t[n]=!1,i=1);i&&e.revert()})||Si()},addEventListener:function(e,t){var i=Nt[e]||(Nt[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=Nt[e],n=i&&i.indexOf(t);n>=0&&i.splice(n,1)},utils:{wrap:cs,wrapYoyo:hs,distribute:yn,random:bn,snap:xn,normalize:ls,getUnit:q,clamp:rs,splitColor:Sn,toArray:fe,selector:fi,mapRange:En,pipe:as,unitize:os,interpolate:us,shuffle:_n},install:en,effects:oi,ticker:ue,updateRoot:Q.updateRoot,plugins:le,globalTimeline:$,core:{PropTween:ie,globals:tn,Tween:Z,Timeline:Q,Animation:yt,getCache:Ue,_removeLinkedListItem:Lt,reverting:function(){return W},context:function(e){return e&&z&&(z.data.push(e),e._ctx=z),z},suppressOverwrites:function(e){return Kt=e}}};te("to,from,fromTo,delayedCall,set,killTweensOf",function(a){return $t[a]=Z[a]}),ue.add(Q.updateRoot),it=$t.to({},{duration:0});var ks=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Is=function(e,t){var i=e._targets,n,r,s;for(n in t)for(r=i.length;r--;)s=e._ptLookup[r][n],s&&(s=s.d)&&(s._pt&&(s=ks(s,n)),s&&s.modifier&&s.modifier(t[n],e,i[r],n))},Ai=function(e,t){return{name:e,headless:1,rawVars:1,init:function(n,r,s){s._onInit=function(o){var l,h;if(H(r)&&(l={},te(r,function(c){return l[c]=1}),r=l),t){l={};for(h in r)l[h]=t(r[h]);r=l}Is(o,r)}}}},ne=$t.registerPlugin({name:"attr",init:function(e,t,i,n,r){var s,o,l;this.tween=i;for(s in t)l=e.getAttribute(s)||"",o=this.add(e,"setAttribute",(l||0)+"",t[s],n,r,0,0,s),o.op=s,o.b=l,this._props.push(s)},render:function(e,t){for(var i=t._pt;i;)W?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Ai("roundProps",mi),Ai("modifiers"),Ai("snap",xn))||$t;Z.version=Q.version=ne.version="3.13.0",Ji=1,Jt()&&nt(),D.Power0,D.Power1,D.Power2,D.Power3,D.Power4,D.Linear,D.Quad,D.Cubic,D.Quart,D.Quint,D.Strong,D.Elastic,D.Back,D.SteppedEase,D.Bounce,D.Sine,D.Expo,D.Circ;var Gn,ke,rt,Ti,Be,jn,Di,Rs=function(){return typeof window<"u"},Pe={},Ve=180/Math.PI,st=Math.PI/180,at=Math.atan2,Yn=1e8,Mi=/([A-Z])/g,Ls=/(left|right|width|margin|padding|x)/i,Us=/[\s,\(]\S/,xe={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Oi=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Fs=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},zs=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Ns=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Zn=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Xn=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},$s=function(e,t,i){return e.style[t]=i},Bs=function(e,t,i){return e.style.setProperty(t,i)},Vs=function(e,t,i){return e._gsap[t]=i},Gs=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},js=function(e,t,i,n,r){var s=e._gsap;s.scaleX=s.scaleY=i,s.renderTransform(r,s)},Ys=function(e,t,i,n,r){var s=e._gsap;s[t]=i,s.renderTransform(r,s)},B="transform",re=B+"Origin",Zs=function a(e,t){var i=this,n=this.target,r=n.style,s=n._gsap;if(e in Pe&&r){if(this.tfm=this.tfm||{},e!=="transform")e=xe[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return i.tfm[o]=Ce(n,o)}):this.tfm[e]=s.x?s[e]:Ce(n,e),e===re&&(this.tfm.zOrigin=s.zOrigin);else return xe.transform.split(",").forEach(function(o){return a.call(i,o,t)});if(this.props.indexOf(B)>=0)return;s.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(re,t,"")),e=B}(r||t)&&this.props.push(e,t,r[e])},Hn=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Xs=function(){var e=this.props,t=this.target,i=t.style,n=t._gsap,r,s;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?i[e[r]]=e[r+2]:i.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(Mi,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)n[s]=this.tfm[s];n.svg&&(n.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=Di(),(!r||!r.isStart)&&!i[B]&&(Hn(i),n.zOrigin&&i[re]&&(i[re]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},Wn=function(e,t){var i={target:e,props:[],revert:Xs,save:Zs};return e._gsap||ne.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(n){return i.save(n)}),i},Kn,ki=function(e,t){var i=ke.createElementNS?ke.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ke.createElement(e);return i&&i.style?i:ke.createElement(e)},me=function a(e,t,i){var n=getComputedStyle(e);return n[t]||n.getPropertyValue(t.replace(Mi,"-$1").toLowerCase())||n.getPropertyValue(t)||!i&&a(e,ot(t)||t,1)||""},qn="O,Moz,ms,Ms,Webkit".split(","),ot=function(e,t,i){var n=t||Be,r=n.style,s=5;if(e in r&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(qn[s]+e in r););return s<0?null:(s===3?"ms":s>=0?qn[s]:"")+e},Ii=function(){Rs()&&window.document&&(Gn=window,ke=Gn.document,rt=ke.documentElement,Be=ki("div")||{style:{}},ki("div"),B=ot(B),re=B+"Origin",Be.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Kn=!!ot("perspective"),Di=ne.core.reverting,Ti=1)},Qn=function(e){var t=e.ownerSVGElement,i=ki("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=e.cloneNode(!0),r;n.style.display="block",i.appendChild(n),rt.appendChild(i);try{r=n.getBBox()}catch{}return i.removeChild(n),rt.removeChild(i),r},Jn=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},er=function(e){var t,i;try{t=e.getBBox()}catch{t=Qn(e),i=1}return t&&(t.width||t.height)||i||(t=Qn(e)),t&&!t.width&&!t.x&&!t.y?{x:+Jn(e,["x","cx","x1"])||0,y:+Jn(e,["y","cy","y1"])||0,width:0,height:0}:t},tr=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&er(e))},Ge=function(e,t){if(t){var i=e.style,n;t in Pe&&t!==re&&(t=B),i.removeProperty?(n=t.substr(0,2),(n==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(n==="--"?t:t.replace(Mi,"-$1").toLowerCase())):i.removeAttribute(t)}},Ie=function(e,t,i,n,r,s){var o=new ie(e._pt,t,i,0,1,s?Xn:Zn);return e._pt=o,o.b=n,o.e=r,e._props.push(i),o},ir={deg:1,rad:1,turn:1},Hs={grid:1,flex:1},Re=function a(e,t,i,n){var r=parseFloat(i)||0,s=(i+"").trim().substr((r+"").length)||"px",o=Be.style,l=Ls.test(t),h=e.tagName.toLowerCase()==="svg",c=(h?"client":"offset")+(l?"Width":"Height"),u=100,p=n==="px",m=n==="%",f,d,g,_;if(n===s||!r||ir[n]||ir[s])return r;if(s!=="px"&&!p&&(r=a(e,t,i,"px")),_=e.getCTM&&tr(e),(m||s==="%")&&(Pe[t]||~t.indexOf("adius")))return f=_?e.getBBox()[l?"width":"height"]:e[c],j(m?r/f*u:r/100*f);if(o[l?"width":"height"]=u+(p?s:n),d=n!=="rem"&&~t.indexOf("adius")||n==="em"&&e.appendChild&&!h?e:e.parentNode,_&&(d=(e.ownerSVGElement||{}).parentNode),(!d||d===ke||!d.appendChild)&&(d=ke.body),g=d._gsap,g&&m&&g.width&&l&&g.time===ue.time&&!g.uncache)return j(r/g.width*u);if(m&&(t==="height"||t==="width")){var y=e.style[t];e.style[t]=u+n,f=e[c],y?e.style[t]=y:Ge(e,t)}else(m||s==="%")&&!Hs[me(d,"display")]&&(o.position=me(e,"position")),d===e&&(o.position="static"),d.appendChild(Be),f=Be[c],d.removeChild(Be),o.position="absolute";return l&&m&&(g=Ue(d),g.time=ue.time,g.width=d[c]),j(p?f*r/u:f&&r?u/f*r:0)},Ce=function(e,t,i,n){var r;return Ti||Ii(),t in xe&&t!=="transform"&&(t=xe[t],~t.indexOf(",")&&(t=t.split(",")[0])),Pe[t]&&t!=="transform"?(r=vt(e,n),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:Vt(me(e,re))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||n||~(r+"").indexOf("calc("))&&(r=Bt[t]&&Bt[t](e,t,i)||me(e,t)||sn(e,t)||(t==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?Re(e,t,r,i)+i:r},Ws=function(e,t,i,n){if(!i||i==="none"){var r=ot(t,e,1),s=r&&me(e,r,1);s&&s!==i?(t=r,i=s):t==="borderColor"&&(i=me(e,"borderTopColor"))}var o=new ie(this._pt,e.style,t,0,1,Nn),l=0,h=0,c,u,p,m,f,d,g,_,y,x,b,v;if(o.b=i,o.e=n,i+="",n+="",n.substring(0,6)==="var(--"&&(n=me(e,n.substring(4,n.indexOf(")")))),n==="auto"&&(d=e.style[t],e.style[t]=n,n=me(e,t)||n,d?e.style[t]=d:Ge(e,t)),c=[i,n],Dn(c),i=c[0],n=c[1],p=i.match(qe)||[],v=n.match(qe)||[],v.length){for(;u=qe.exec(n);)g=u[0],y=n.substring(l,u.index),f?f=(f+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(f=1),g!==(d=p[h++]||"")&&(m=parseFloat(d)||0,b=d.substr((m+"").length),g.charAt(1)==="="&&(g=Qe(m,g)+b),_=parseFloat(g),x=g.substr((_+"").length),l=qe.lastIndex-x.length,x||(x=x||ae.units[t]||b,l===n.length&&(n+=x,o.e+=x)),b!==x&&(m=Re(e,t,d,x)||0),o._pt={_next:o._pt,p:y||h===1?y:",",s:m,c:_-m,m:f&&f<4||t==="zIndex"?Math.round:0});o.c=l<n.length?n.substring(l,n.length):""}else o.r=t==="display"&&n==="none"?Xn:Zn;return qi.test(n)&&(o.e=0),this._pt=o,o},nr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Ks=function(e){var t=e.split(" "),i=t[0],n=t[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(e=i,i=n,n=e),t[0]=nr[i]||i,t[1]=nr[n]||n,t.join(" ")},qs=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,n=i.style,r=t.u,s=i._gsap,o,l,h;if(r==="all"||r===!0)n.cssText="",l=1;else for(r=r.split(","),h=r.length;--h>-1;)o=r[h],Pe[o]&&(l=1,o=o==="transformOrigin"?re:B),Ge(i,o);l&&(Ge(i,B),s&&(s.svg&&i.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",vt(i,1),s.uncache=1,Hn(n)))}},Bt={clearProps:function(e,t,i,n,r){if(r.data!=="isFromStart"){var s=e._pt=new ie(e._pt,t,i,0,0,qs);return s.u=n,s.pr=-10,s.tween=r,e._props.push(i),1}}},bt=[1,0,0,1,0,0],rr={},sr=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},ar=function(e){var t=me(e,B);return sr(t)?bt:t.substr(7).match(Ki).map(j)},Ri=function(e,t){var i=e._gsap||Ue(e),n=e.style,r=ar(e),s,o,l,h;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?bt:r):(r===bt&&!e.offsetParent&&e!==rt&&!i.svg&&(l=n.display,n.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(h=1,o=e.nextElementSibling,rt.appendChild(e)),r=ar(e),l?n.display=l:Ge(e,"display"),h&&(o?s.insertBefore(e,o):s?s.appendChild(e):rt.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Li=function(e,t,i,n,r,s){var o=e._gsap,l=r||Ri(e,!0),h=o.xOrigin||0,c=o.yOrigin||0,u=o.xOffset||0,p=o.yOffset||0,m=l[0],f=l[1],d=l[2],g=l[3],_=l[4],y=l[5],x=t.split(" "),b=parseFloat(x[0])||0,v=parseFloat(x[1])||0,P,w,C,E;i?l!==bt&&(w=m*g-f*d)&&(C=b*(g/w)+v*(-d/w)+(d*y-g*_)/w,E=b*(-f/w)+v*(m/w)-(m*y-f*_)/w,b=C,v=E):(P=er(e),b=P.x+(~x[0].indexOf("%")?b/100*P.width:b),v=P.y+(~(x[1]||x[0]).indexOf("%")?v/100*P.height:v)),n||n!==!1&&o.smooth?(_=b-h,y=v-c,o.xOffset=u+(_*m+y*d)-_,o.yOffset=p+(_*f+y*g)-y):o.xOffset=o.yOffset=0,o.xOrigin=b,o.yOrigin=v,o.smooth=!!n,o.origin=t,o.originIsAbsolute=!!i,e.style[re]="0px 0px",s&&(Ie(s,o,"xOrigin",h,b),Ie(s,o,"yOrigin",c,v),Ie(s,o,"xOffset",u,o.xOffset),Ie(s,o,"yOffset",p,o.yOffset)),e.setAttribute("data-svg-origin",b+" "+v)},vt=function(e,t){var i=e._gsap||new In(e);if("x"in i&&!t&&!i.uncache)return i;var n=e.style,r=i.scaleX<0,s="px",o="deg",l=getComputedStyle(e),h=me(e,re)||"0",c,u,p,m,f,d,g,_,y,x,b,v,P,w,C,E,T,O,A,k,I,G,N,F,se,Ct,St,At,He,Sr,Se,We;return c=u=p=d=g=_=y=x=b=0,m=f=1,i.svg=!!(e.getCTM&&tr(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(n[B]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[B]!=="none"?l[B]:"")),n.scale=n.rotate=n.translate="none"),w=Ri(e,i.svg),i.svg&&(i.uncache?(se=e.getBBox(),h=i.xOrigin-se.x+"px "+(i.yOrigin-se.y)+"px",F=""):F=!t&&e.getAttribute("data-svg-origin"),Li(e,F||h,!!F||i.originIsAbsolute,i.smooth!==!1,w)),v=i.xOrigin||0,P=i.yOrigin||0,w!==bt&&(O=w[0],A=w[1],k=w[2],I=w[3],c=G=w[4],u=N=w[5],w.length===6?(m=Math.sqrt(O*O+A*A),f=Math.sqrt(I*I+k*k),d=O||A?at(A,O)*Ve:0,y=k||I?at(k,I)*Ve+d:0,y&&(f*=Math.abs(Math.cos(y*st))),i.svg&&(c-=v-(v*O+P*k),u-=P-(v*A+P*I))):(We=w[6],Sr=w[7],St=w[8],At=w[9],He=w[10],Se=w[11],c=w[12],u=w[13],p=w[14],C=at(We,He),g=C*Ve,C&&(E=Math.cos(-C),T=Math.sin(-C),F=G*E+St*T,se=N*E+At*T,Ct=We*E+He*T,St=G*-T+St*E,At=N*-T+At*E,He=We*-T+He*E,Se=Sr*-T+Se*E,G=F,N=se,We=Ct),C=at(-k,He),_=C*Ve,C&&(E=Math.cos(-C),T=Math.sin(-C),F=O*E-St*T,se=A*E-At*T,Ct=k*E-He*T,Se=I*T+Se*E,O=F,A=se,k=Ct),C=at(A,O),d=C*Ve,C&&(E=Math.cos(C),T=Math.sin(C),F=O*E+A*T,se=G*E+N*T,A=A*E-O*T,N=N*E-G*T,O=F,G=se),g&&Math.abs(g)+Math.abs(d)>359.9&&(g=d=0,_=180-_),m=j(Math.sqrt(O*O+A*A+k*k)),f=j(Math.sqrt(N*N+We*We)),C=at(G,N),y=Math.abs(C)>2e-4?C*Ve:0,b=Se?1/(Se<0?-Se:Se):0),i.svg&&(F=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!sr(me(e,B)),F&&e.setAttribute("transform",F))),Math.abs(y)>90&&Math.abs(y)<270&&(r?(m*=-1,y+=d<=0?180:-180,d+=d<=0?180:-180):(f*=-1,y+=y<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+s,i.y=u-((i.yPercent=u&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+s,i.z=p+s,i.scaleX=j(m),i.scaleY=j(f),i.rotation=j(d)+o,i.rotationX=j(g)+o,i.rotationY=j(_)+o,i.skewX=y+o,i.skewY=x+o,i.transformPerspective=b+s,(i.zOrigin=parseFloat(h.split(" ")[2])||!t&&i.zOrigin||0)&&(n[re]=Vt(h)),i.xOffset=i.yOffset=0,i.force3D=ae.force3D,i.renderTransform=i.svg?Js:Kn?or:Qs,i.uncache=0,i},Vt=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ui=function(e,t,i){var n=q(t);return j(parseFloat(t)+parseFloat(Re(e,"x",i+"px",n)))+n},Qs=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,or(e,t)},je="0deg",Et="0px",Ye=") ",or=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,s=i.x,o=i.y,l=i.z,h=i.rotation,c=i.rotationY,u=i.rotationX,p=i.skewX,m=i.skewY,f=i.scaleX,d=i.scaleY,g=i.transformPerspective,_=i.force3D,y=i.target,x=i.zOrigin,b="",v=_==="auto"&&e&&e!==1||_===!0;if(x&&(u!==je||c!==je)){var P=parseFloat(c)*st,w=Math.sin(P),C=Math.cos(P),E;P=parseFloat(u)*st,E=Math.cos(P),s=Ui(y,s,w*E*-x),o=Ui(y,o,-Math.sin(P)*-x),l=Ui(y,l,C*E*-x+x)}g!==Et&&(b+="perspective("+g+Ye),(n||r)&&(b+="translate("+n+"%, "+r+"%) "),(v||s!==Et||o!==Et||l!==Et)&&(b+=l!==Et||v?"translate3d("+s+", "+o+", "+l+") ":"translate("+s+", "+o+Ye),h!==je&&(b+="rotate("+h+Ye),c!==je&&(b+="rotateY("+c+Ye),u!==je&&(b+="rotateX("+u+Ye),(p!==je||m!==je)&&(b+="skew("+p+", "+m+Ye),(f!==1||d!==1)&&(b+="scale("+f+", "+d+Ye),y.style[B]=b||"translate(0, 0)"},Js=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,s=i.x,o=i.y,l=i.rotation,h=i.skewX,c=i.skewY,u=i.scaleX,p=i.scaleY,m=i.target,f=i.xOrigin,d=i.yOrigin,g=i.xOffset,_=i.yOffset,y=i.forceCSS,x=parseFloat(s),b=parseFloat(o),v,P,w,C,E;l=parseFloat(l),h=parseFloat(h),c=parseFloat(c),c&&(c=parseFloat(c),h+=c,l+=c),l||h?(l*=st,h*=st,v=Math.cos(l)*u,P=Math.sin(l)*u,w=Math.sin(l-h)*-p,C=Math.cos(l-h)*p,h&&(c*=st,E=Math.tan(h-c),E=Math.sqrt(1+E*E),w*=E,C*=E,c&&(E=Math.tan(c),E=Math.sqrt(1+E*E),v*=E,P*=E)),v=j(v),P=j(P),w=j(w),C=j(C)):(v=u,C=p,P=w=0),(x&&!~(s+"").indexOf("px")||b&&!~(o+"").indexOf("px"))&&(x=Re(m,"x",s,"px"),b=Re(m,"y",o,"px")),(f||d||g||_)&&(x=j(x+f-(f*v+d*w)+g),b=j(b+d-(f*P+d*C)+_)),(n||r)&&(E=m.getBBox(),x=j(x+n/100*E.width),b=j(b+r/100*E.height)),E="matrix("+v+","+P+","+w+","+C+","+x+","+b+")",m.setAttribute("transform",E),y&&(m.style[B]=E)},ea=function(e,t,i,n,r){var s=360,o=H(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?Ve:1),h=l-n,c=n+h+"deg",u,p;return o&&(u=r.split("_")[1],u==="short"&&(h%=s,h!==h%(s/2)&&(h+=h<0?s:-s)),u==="cw"&&h<0?h=(h+s*Yn)%s-~~(h/s)*s:u==="ccw"&&h>0&&(h=(h-s*Yn)%s-~~(h/s)*s)),e._pt=p=new ie(e._pt,t,i,n,h,Fs),p.e=c,p.u="deg",e._props.push(i),p},lr=function(e,t){for(var i in t)e[i]=t[i];return e},ta=function(e,t,i){var n=lr({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",s=i.style,o,l,h,c,u,p,m,f;n.svg?(h=i.getAttribute("transform"),i.setAttribute("transform",""),s[B]=t,o=vt(i,1),Ge(i,B),i.setAttribute("transform",h)):(h=getComputedStyle(i)[B],s[B]=t,o=vt(i,1),s[B]=h);for(l in Pe)h=n[l],c=o[l],h!==c&&r.indexOf(l)<0&&(m=q(h),f=q(c),u=m!==f?Re(i,l,h,f):parseFloat(h),p=parseFloat(c),e._pt=new ie(e._pt,o,l,u,p-u,Oi),e._pt.u=f||0,e._props.push(l));lr(o,n)};te("padding,margin,Width,Radius",function(a,e){var t="Top",i="Right",n="Bottom",r="Left",s=(e<3?[t,i,n,r]:[t+r,t+i,n+i,n+r]).map(function(o){return e<2?a+o:"border"+o+a});Bt[e>1?"border"+a:a]=function(o,l,h,c,u){var p,m;if(arguments.length<4)return p=s.map(function(f){return Ce(o,f,h)}),m=p.join(" "),m.split(p[0]).length===5?p[0]:m;p=(c+"").split(" "),m={},s.forEach(function(f,d){return m[f]=p[d]=p[d]||p[(d-1)/2|0]}),o.init(l,m,u)}});var cr={name:"css",register:Ii,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,n,r){var s=this._props,o=e.style,l=i.vars.startAt,h,c,u,p,m,f,d,g,_,y,x,b,v,P,w,C;Ti||Ii(),this.styles=this.styles||Wn(e),C=this.styles.props,this.tween=i;for(d in t)if(d!=="autoRound"&&(c=t[d],!(le[d]&&Rn(d,t,i,n,e,r)))){if(m=typeof c,f=Bt[d],m==="function"&&(c=c.call(i,n,e,r),m=typeof c),m==="string"&&~c.indexOf("random(")&&(c=ft(c)),f)f(this,e,d,c,i)&&(w=1);else if(d.substr(0,2)==="--")h=(getComputedStyle(e).getPropertyValue(d)+"").trim(),c+="",Me.lastIndex=0,Me.test(h)||(g=q(h),_=q(c)),_?g!==_&&(h=Re(e,d,h,_)+_):g&&(c+=g),this.add(o,"setProperty",h,c,n,r,0,0,d),s.push(d),C.push(d,0,o[d]);else if(m!=="undefined"){if(l&&d in l?(h=typeof l[d]=="function"?l[d].call(i,n,e,r):l[d],H(h)&&~h.indexOf("random(")&&(h=ft(h)),q(h+"")||h==="auto"||(h+=ae.units[d]||q(Ce(e,d))||""),(h+"").charAt(1)==="="&&(h=Ce(e,d))):h=Ce(e,d),p=parseFloat(h),y=m==="string"&&c.charAt(1)==="="&&c.substr(0,2),y&&(c=c.substr(2)),u=parseFloat(c),d in xe&&(d==="autoAlpha"&&(p===1&&Ce(e,"visibility")==="hidden"&&u&&(p=0),C.push("visibility",0,o.visibility),Ie(this,o,"visibility",p?"inherit":"hidden",u?"inherit":"hidden",!u)),d!=="scale"&&d!=="transform"&&(d=xe[d],~d.indexOf(",")&&(d=d.split(",")[0]))),x=d in Pe,x){if(this.styles.save(d),m==="string"&&c.substring(0,6)==="var(--"&&(c=me(e,c.substring(4,c.indexOf(")"))),u=parseFloat(c)),b||(v=e._gsap,v.renderTransform&&!t.parseTransform||vt(e,t.parseTransform),P=t.smoothOrigin!==!1&&v.smooth,b=this._pt=new ie(this._pt,o,B,0,1,v.renderTransform,v,0,-1),b.dep=1),d==="scale")this._pt=new ie(this._pt,v,"scaleY",v.scaleY,(y?Qe(v.scaleY,y+u):u)-v.scaleY||0,Oi),this._pt.u=0,s.push("scaleY",d),d+="X";else if(d==="transformOrigin"){C.push(re,0,o[re]),c=Ks(c),v.svg?Li(e,c,0,P,0,this):(_=parseFloat(c.split(" ")[2])||0,_!==v.zOrigin&&Ie(this,v,"zOrigin",v.zOrigin,_),Ie(this,o,d,Vt(h),Vt(c)));continue}else if(d==="svgOrigin"){Li(e,c,1,P,0,this);continue}else if(d in rr){ea(this,v,d,p,y?Qe(p,y+c):c);continue}else if(d==="smoothOrigin"){Ie(this,v,"smooth",v.smooth,c);continue}else if(d==="force3D"){v[d]=c;continue}else if(d==="transform"){ta(this,c,e);continue}}else d in o||(d=ot(d)||d);if(x||(u||u===0)&&(p||p===0)&&!Us.test(c)&&d in o)g=(h+"").substr((p+"").length),u||(u=0),_=q(c)||(d in ae.units?ae.units[d]:g),g!==_&&(p=Re(e,d,h,_)),this._pt=new ie(this._pt,x?v:o,d,p,(y?Qe(p,y+u):u)-p,!x&&(_==="px"||d==="zIndex")&&t.autoRound!==!1?Ns:Oi),this._pt.u=_||0,g!==_&&_!=="%"&&(this._pt.b=h,this._pt.r=zs);else if(d in o)Ws.call(this,e,d,h,y?y+c:c);else if(d in e)this.add(e,d,h||e[d],y?y+c:c,n,r);else if(d!=="parseTransform"){ri(d,c);continue}x||(d in o?C.push(d,0,o[d]):typeof e[d]=="function"?C.push(d,2,e[d]()):C.push(d,1,h||e[d])),s.push(d)}}w&&$n(this)},render:function(e,t){if(t.tween._time||!Di())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Ce,aliases:xe,getSetter:function(e,t,i){var n=xe[t];return n&&n.indexOf(",")<0&&(t=n),t in Pe&&t!==re&&(e._gsap.x||Ce(e,"x"))?i&&jn===i?t==="scale"?Gs:Vs:(jn=i||{})&&(t==="scale"?js:Ys):e.style&&!Qt(e.style[t])?$s:~t.indexOf("-")?Bs:wi(e,t)},core:{_removeProperty:Ge,_getMatrix:Ri}};ne.utils.checkPrefix=ot,ne.core.getStyleSaver=Wn,(function(a,e,t,i){var n=te(a+","+e+","+t,function(r){Pe[r]=1});te(e,function(r){ae.units[r]="deg",rr[r]=1}),xe[n[13]]=a+","+e,te(i,function(r){var s=r.split(":");xe[s[1]]=n[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),te("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(a){ae.units[a]="px"}),ne.registerPlugin(cr);var wt=ne.registerPlugin(cr)||ne;wt.core.Tween;class be{constructor(e,t,i,n,r="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),be.nextNameID=be.nextNameID||0,this.$name.id=`lil-gui-name-${++be.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ia extends be{constructor(e,t,i){super(e,t,i,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Fi(a){let e,t;return(e=a.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=a.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=a.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const na={isPrimitive:!0,match:a=>typeof a=="string",fromHexString:Fi,toHexString:Fi},Pt={isPrimitive:!0,match:a=>typeof a=="number",fromHexString:a=>parseInt(a.substring(1),16),toHexString:a=>"#"+a.toString(16).padStart(6,0)},ra=[na,Pt,{isPrimitive:!1,match:a=>Array.isArray(a)||ArrayBuffer.isView(a),fromHexString(a,e,t=1){const i=Pt.fromHexString(a);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([a,e,t],i=1){i=255/i;const n=a*i<<16^e*i<<8^t*i<<0;return Pt.toHexString(n)}},{isPrimitive:!1,match:a=>Object(a)===a,fromHexString(a,e,t=1){const i=Pt.fromHexString(a);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:a,g:e,b:t},i=1){i=255/i;const n=a*i<<16^e*i<<8^t*i<<0;return Pt.toHexString(n)}}];function sa(a){return ra.find(e=>e.match(a))}class aa extends be{constructor(e,t,i,n){super(e,t,i,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=sa(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=Fi(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class zi extends be{constructor(e,t,i){super(e,t,i,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class oa extends be{constructor(e,t,i,n,r,s){super(e,t,i,"lil-number"),this._initInput(),this.min(n),this.max(r);const o=s!==void 0;this.step(o?s:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let y=parseFloat(this.$input.value);isNaN(y)||(this._stepExplicit&&(y=this._snap(y)),this.setValue(this._clamp(y)))},i=y=>{const x=parseFloat(this.$input.value);isNaN(x)||(this._snapClampSetValue(x+y),this.$input.value=this.getValue())},n=y=>{y.key==="Enter"&&this.$input.blur(),y.code==="ArrowUp"&&(y.preventDefault(),i(this._step*this._arrowKeyMultiplier(y))),y.code==="ArrowDown"&&(y.preventDefault(),i(this._step*this._arrowKeyMultiplier(y)*-1))},r=y=>{this._inputFocused&&(y.preventDefault(),i(this._step*this._normalizeMouseWheel(y)))};let s=!1,o,l,h,c,u;const p=5,m=y=>{o=y.clientX,l=h=y.clientY,s=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",f),window.addEventListener("mouseup",d)},f=y=>{if(s){const x=y.clientX-o,b=y.clientY-l;Math.abs(b)>p?(y.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(x)>p&&d()}if(!s){const x=y.clientY-h;u-=x*this._step*this._arrowKeyMultiplier(y),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}h=y.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",f),window.removeEventListener("mouseup",d)},g=()=>{this._inputFocused=!0},_=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",g),this.$input.addEventListener("blur",_)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(_,y,x,b,v)=>(_-y)/(x-y)*(v-b)+b,t=_=>{const y=this.$slider.getBoundingClientRect();let x=e(_,y.left,y.right,this._min,this._max);this._snapClampSetValue(x)},i=_=>{this._setDraggingStyle(!0),t(_.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",r)},n=_=>{t(_.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",r)};let s=!1,o,l;const h=_=>{_.preventDefault(),this._setDraggingStyle(!0),t(_.touches[0].clientX),s=!1},c=_=>{_.touches.length>1||(this._hasScrollBar?(o=_.touches[0].clientX,l=_.touches[0].clientY,s=!0):h(_),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",p))},u=_=>{if(s){const y=_.touches[0].clientX-o,x=_.touches[0].clientY-l;Math.abs(y)>Math.abs(x)?h(_):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",p))}else _.preventDefault(),t(_.touches[0].clientX)},p=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",p)},m=this._callOnFinishChange.bind(this),f=400;let d;const g=_=>{if(Math.abs(_.deltaX)<Math.abs(_.deltaY)&&this._hasScrollBar)return;_.preventDefault();const x=this._normalizeMouseWheel(_)*this._step;this._snapClampSetValue(this.getValue()+x),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(m,f)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",g,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class la extends be{constructor(e,t,i,n){super(e,t,i,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const i=document.createElement("option");i.textContent=t,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class ca extends be{constructor(e,t,i){super(e,t,i,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var ha=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function ua(a){const e=document.createElement("style");e.innerHTML=a;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let hr=!1;class Ni{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:n,title:r="Controls",closeFolders:s=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),l&&this.domElement.classList.add("lil-allow-touch-styles"),!hr&&o&&(ua(ha),hr=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=s}add(e,t,i,n,r){if(Object(i)===i)return new la(this,e,t,i);const s=e[t];switch(typeof s){case"number":return new oa(this,e,t,i,n,r);case"boolean":return new ia(this,e,t);case"string":return new ca(this,e,t);case"function":return new zi(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,s)}addColor(e,t,i=1){return new aa(this,e,t,i)}addFolder(e){const t=new Ni({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof zi||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof zi)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("lil-transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const n=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}function da(a){return a}function pa(a){if(a==null)return da;var e,t,i=a.scale[0],n=a.scale[1],r=a.translate[0],s=a.translate[1];return function(o,l){l||(e=t=0);var h=2,c=o.length,u=new Array(c);for(u[0]=(e+=o[0])*i+r,u[1]=(t+=o[1])*n+s;h<c;)u[h]=o[h],++h;return u}}function fa(a,e){for(var t,i=a.length,n=i-e;n<--i;)t=a[n],a[n++]=a[i],a[i]=t}function ma(a,e){return typeof e=="string"&&(e=a.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(t){return ur(a,t)})}:ur(a,e)}function ur(a,e){var t=e.id,i=e.bbox,n=e.properties==null?{}:e.properties,r=ga(a,e);return t==null&&i==null?{type:"Feature",properties:n,geometry:r}:i==null?{type:"Feature",id:t,properties:n,geometry:r}:{type:"Feature",id:t,bbox:i,properties:n,geometry:r}}function ga(a,e){var t=pa(a.transform),i=a.arcs;function n(c,u){u.length&&u.pop();for(var p=i[c<0?~c:c],m=0,f=p.length;m<f;++m)u.push(t(p[m],m));c<0&&fa(u,f)}function r(c){return t(c)}function s(c){for(var u=[],p=0,m=c.length;p<m;++p)n(c[p],u);return u.length<2&&u.push(u[0]),u}function o(c){for(var u=s(c);u.length<4;)u.push(u[0]);return u}function l(c){return c.map(o)}function h(c){var u=c.type,p;switch(u){case"GeometryCollection":return{type:u,geometries:c.geometries.map(h)};case"Point":p=r(c.coordinates);break;case"MultiPoint":p=c.coordinates.map(r);break;case"LineString":p=s(c.arcs);break;case"MultiLineString":p=c.arcs.map(s);break;case"Polygon":p=l(c.arcs);break;case"MultiPolygon":p=c.arcs.map(l);break;default:return null}return{type:u,coordinates:p}}return h(e)}const $i=[{id:"156",code:"CN",name:"China",population:1412,gdpPerCapita:21476,co2Emissions:8,lifeExpectancy:78.2,humanDevIndex:.768,internetUsers:73,renewableEnergy:15,urbanPopulation:64.7,healthExpenditure:5.4,educationExpenditure:3.6,forestArea:23.3,accessElectricity:100},{id:"356",code:"IN",name:"India",population:1408,gdpPerCapita:8379,co2Emissions:1.9,lifeExpectancy:70.8,humanDevIndex:.633,internetUsers:47,renewableEnergy:38,urbanPopulation:35.9,healthExpenditure:3,educationExpenditure:4.5,forestArea:24.3,accessElectricity:99.6},{id:"840",code:"US",name:"United States",population:332,gdpPerCapita:76399,co2Emissions:14.4,lifeExpectancy:77.5,humanDevIndex:.921,internetUsers:92,renewableEnergy:13,urbanPopulation:83.1,healthExpenditure:18.3,educationExpenditure:6.1,forestArea:33.9,accessElectricity:100},{id:"360",code:"ID",name:"Indonesia",population:276,gdpPerCapita:14535,co2Emissions:2.3,lifeExpectancy:71.9,humanDevIndex:.705,internetUsers:62,renewableEnergy:12,urbanPopulation:57.9,healthExpenditure:2.9,educationExpenditure:3.5,forestArea:49.1,accessElectricity:99},{id:"586",code:"PK",name:"Pakistan",population:225,gdpPerCapita:6470,co2Emissions:1,lifeExpectancy:67.3,humanDevIndex:.544,internetUsers:21,renewableEnergy:34,urbanPopulation:37.4,healthExpenditure:2.8,educationExpenditure:2.3,forestArea:1.9,accessElectricity:95},{id:"076",code:"BR",name:"Brazil",population:215,gdpPerCapita:16154,co2Emissions:2.2,lifeExpectancy:76,humanDevIndex:.754,internetUsers:81,renewableEnergy:47,urbanPopulation:87.6,healthExpenditure:10.3,educationExpenditure:6.3,forestArea:59.4,accessElectricity:100},{id:"566",code:"NG",name:"Nigeria",population:219,gdpPerCapita:5860,co2Emissions:.6,lifeExpectancy:53.9,humanDevIndex:.535,internetUsers:36,renewableEnergy:86,urbanPopulation:53,healthExpenditure:3,educationExpenditure:.5,forestArea:7.2,accessElectricity:59.5},{id:"050",code:"BD",name:"Bangladesh",population:167,gdpPerCapita:7066,co2Emissions:.6,lifeExpectancy:73.2,humanDevIndex:.661,internetUsers:39,renewableEnergy:3,urbanPopulation:39.4,healthExpenditure:2.3,educationExpenditure:1.8,forestArea:11.2,accessElectricity:99.4},{id:"643",code:"RU",name:"Russia",population:144,gdpPerCapita:30820,co2Emissions:11.4,lifeExpectancy:72.8,humanDevIndex:.822,internetUsers:85,renewableEnergy:7,urbanPopulation:75.1,healthExpenditure:5.6,educationExpenditure:3.7,forestArea:49.8,accessElectricity:100},{id:"484",code:"MX",name:"Mexico",population:130,gdpPerCapita:20824,co2Emissions:3.5,lifeExpectancy:75.1,humanDevIndex:.758,internetUsers:72,renewableEnergy:9,urbanPopulation:81,healthExpenditure:5.4,educationExpenditure:4.3,forestArea:33.6,accessElectricity:100},{id:"392",code:"JP",name:"Japan",population:125,gdpPerCapita:45546,co2Emissions:8.5,lifeExpectancy:84.6,humanDevIndex:.925,internetUsers:93,renewableEnergy:12,urbanPopulation:91.9,healthExpenditure:11,educationExpenditure:3.4,forestArea:68.4,accessElectricity:100},{id:"231",code:"ET",name:"Ethiopia",population:121,gdpPerCapita:2771,co2Emissions:.2,lifeExpectancy:66.6,humanDevIndex:.498,internetUsers:17,renewableEnergy:93,urbanPopulation:22.2,healthExpenditure:3.5,educationExpenditure:4.5,forestArea:12.5,accessElectricity:51.1},{id:"608",code:"PH",name:"Philippines",population:115,gdpPerCapita:9746,co2Emissions:1.3,lifeExpectancy:72.1,humanDevIndex:.699,internetUsers:53,renewableEnergy:29,urbanPopulation:47.7,healthExpenditure:5.1,educationExpenditure:3.6,forestArea:27,accessElectricity:97.2},{id:"818",code:"EG",name:"Egypt",population:106,gdpPerCapita:14927,co2Emissions:2.4,lifeExpectancy:72,humanDevIndex:.731,internetUsers:72,renewableEnergy:10,urbanPopulation:42.8,healthExpenditure:4.6,educationExpenditure:4,forestArea:.1,accessElectricity:100},{id:"704",code:"VN",name:"Vietnam",population:99,gdpPerCapita:12756,co2Emissions:3.5,lifeExpectancy:75.8,humanDevIndex:.703,internetUsers:70,renewableEnergy:21,urbanPopulation:38.1,healthExpenditure:4.7,educationExpenditure:4.2,forestArea:47.6,accessElectricity:100},{id:"276",code:"DE",name:"Germany",population:84,gdpPerCapita:58780,co2Emissions:8.1,lifeExpectancy:81.4,humanDevIndex:.942,internetUsers:93,renewableEnergy:20,urbanPopulation:77.6,healthExpenditure:12.8,educationExpenditure:4.9,forestArea:32.7,accessElectricity:100},{id:"792",code:"TR",name:"Turkey",population:85,gdpPerCapita:36879,co2Emissions:4.8,lifeExpectancy:78.6,humanDevIndex:.838,internetUsers:83,renewableEnergy:17,urbanPopulation:76.6,healthExpenditure:4.3,educationExpenditure:3.1,forestArea:28.6,accessElectricity:100},{id:"364",code:"IR",name:"Iran",population:87,gdpPerCapita:16261,co2Emissions:8.3,lifeExpectancy:76.7,humanDevIndex:.774,internetUsers:78,renewableEnergy:6,urbanPopulation:76.3,healthExpenditure:5.2,educationExpenditure:3.6,forestArea:6.6,accessElectricity:100},{id:"764",code:"TH",name:"Thailand",population:70,gdpPerCapita:19169,co2Emissions:3.8,lifeExpectancy:79.3,humanDevIndex:.8,internetUsers:78,renewableEnergy:15,urbanPopulation:52.2,healthExpenditure:3.8,educationExpenditure:2.9,forestArea:38.8,accessElectricity:100},{id:"826",code:"GB",name:"United Kingdom",population:68,gdpPerCapita:49675,co2Emissions:4.7,lifeExpectancy:81.8,humanDevIndex:.929,internetUsers:97,renewableEnergy:15,urbanPopulation:84.2,healthExpenditure:12,educationExpenditure:5.5,forestArea:13.2,accessElectricity:100},{id:"250",code:"FR",name:"France",population:68,gdpPerCapita:50728,co2Emissions:4.3,lifeExpectancy:82.7,humanDevIndex:.903,internetUsers:91,renewableEnergy:12,urbanPopulation:81.5,healthExpenditure:12.2,educationExpenditure:5.5,forestArea:31.4,accessElectricity:100},{id:"380",code:"IT",name:"Italy",population:59,gdpPerCapita:45936,co2Emissions:5.3,lifeExpectancy:83.5,humanDevIndex:.895,internetUsers:86,renewableEnergy:20,urbanPopulation:71.3,healthExpenditure:8.7,educationExpenditure:4.3,forestArea:32.1,accessElectricity:100},{id:"710",code:"ZA",name:"South Africa",population:60,gdpPerCapita:15e3,co2Emissions:6.7,lifeExpectancy:65.3,humanDevIndex:.713,internetUsers:70,renewableEnergy:6,urbanPopulation:68,healthExpenditure:8.1,educationExpenditure:6.6,forestArea:7.6,accessElectricity:85},{id:"834",code:"TZ",name:"Tanzania",population:63,gdpPerCapita:2990,co2Emissions:.2,lifeExpectancy:66.2,humanDevIndex:.549,internetUsers:25,renewableEnergy:85,urbanPopulation:37,healthExpenditure:3.8,educationExpenditure:3.4,forestArea:48.1,accessElectricity:42.7},{id:"404",code:"KE",name:"Kenya",population:55,gdpPerCapita:5494,co2Emissions:.4,lifeExpectancy:67,humanDevIndex:.575,internetUsers:29,renewableEnergy:75,urbanPopulation:28.5,healthExpenditure:4.3,educationExpenditure:5.1,forestArea:7.8,accessElectricity:75},{id:"410",code:"KR",name:"South Korea",population:52,gdpPerCapita:50071,co2Emissions:11.5,lifeExpectancy:83.7,humanDevIndex:.925,internetUsers:97,renewableEnergy:4,urbanPopulation:81.4,healthExpenditure:8.4,educationExpenditure:5.1,forestArea:63.4,accessElectricity:100},{id:"170",code:"CO",name:"Colombia",population:52,gdpPerCapita:17063,co2Emissions:1.8,lifeExpectancy:77.3,humanDevIndex:.752,internetUsers:73,renewableEnergy:27,urbanPopulation:81.7,healthExpenditure:7.7,educationExpenditure:4.5,forestArea:52.7,accessElectricity:100},{id:"724",code:"ES",name:"Spain",population:47,gdpPerCapita:42190,co2Emissions:5,lifeExpectancy:83.6,humanDevIndex:.905,internetUsers:94,renewableEnergy:21,urbanPopulation:81.1,healthExpenditure:10.7,educationExpenditure:4.8,forestArea:37.4,accessElectricity:100},{id:"032",code:"AR",name:"Argentina",population:46,gdpPerCapita:24678,co2Emissions:3.8,lifeExpectancy:77.1,humanDevIndex:.842,internetUsers:87,renewableEnergy:13,urbanPopulation:92.2,healthExpenditure:10,educationExpenditure:5,forestArea:10.5,accessElectricity:100},{id:"800",code:"UG",name:"Uganda",population:48,gdpPerCapita:2566,co2Emissions:.1,lifeExpectancy:64.4,humanDevIndex:.525,internetUsers:18,renewableEnergy:89,urbanPopulation:25.6,healthExpenditure:3.8,educationExpenditure:2.7,forestArea:9.7,accessElectricity:46},{id:"012",code:"DZ",name:"Algeria",population:45,gdpPerCapita:12667,co2Emissions:3.7,lifeExpectancy:77.1,humanDevIndex:.745,internetUsers:71,renewableEnergy:1,urbanPopulation:74.3,healthExpenditure:5.3,educationExpenditure:5.6,forestArea:.8,accessElectricity:100},{id:"804",code:"UA",name:"Ukraine",population:41,gdpPerCapita:14220,co2Emissions:4.5,lifeExpectancy:72.1,humanDevIndex:.773,internetUsers:75,renewableEnergy:8,urbanPopulation:69.6,healthExpenditure:7,educationExpenditure:5.4,forestArea:16.7,accessElectricity:100},{id:"368",code:"IQ",name:"Iraq",population:43,gdpPerCapita:10474,co2Emissions:4,lifeExpectancy:71.1,humanDevIndex:.686,internetUsers:75,renewableEnergy:3,urbanPopulation:71.1,healthExpenditure:4.6,educationExpenditure:4.7,forestArea:1.9,accessElectricity:100},{id:"616",code:"PL",name:"Poland",population:38,gdpPerCapita:40343,co2Emissions:8,lifeExpectancy:78.7,humanDevIndex:.876,internetUsers:87,renewableEnergy:17,urbanPopulation:60,healthExpenditure:6.5,educationExpenditure:4.6,forestArea:30.9,accessElectricity:100},{id:"124",code:"CA",name:"Canada",population:39,gdpPerCapita:54966,co2Emissions:14.3,lifeExpectancy:82.4,humanDevIndex:.936,internetUsers:93,renewableEnergy:18,urbanPopulation:81.8,healthExpenditure:12.8,educationExpenditure:5.3,forestArea:38.7,accessElectricity:100},{id:"504",code:"MA",name:"Morocco",population:37,gdpPerCapita:9339,co2Emissions:1.9,lifeExpectancy:77,humanDevIndex:.683,internetUsers:84,renewableEnergy:13,urbanPopulation:64.6,healthExpenditure:5.3,educationExpenditure:6.8,forestArea:12.8,accessElectricity:100},{id:"682",code:"SA",name:"Saudi Arabia",population:36,gdpPerCapita:56817,co2Emissions:15.3,lifeExpectancy:76.9,humanDevIndex:.875,internetUsers:98,renewableEnergy:0,urbanPopulation:84.7,healthExpenditure:6.4,educationExpenditure:5.1,forestArea:.5,accessElectricity:100},{id:"604",code:"PE",name:"Peru",population:34,gdpPerCapita:14225,co2Emissions:1.6,lifeExpectancy:77.4,humanDevIndex:.762,internetUsers:71,renewableEnergy:25,urbanPopulation:78.6,healthExpenditure:5.2,educationExpenditure:4,forestArea:57.3,accessElectricity:97},{id:"036",code:"AU",name:"Australia",population:26,gdpPerCapita:59934,co2Emissions:15,lifeExpectancy:84,humanDevIndex:.951,internetUsers:96,renewableEnergy:12,urbanPopulation:86.4,healthExpenditure:10.7,educationExpenditure:6.1,forestArea:17.4,accessElectricity:100},{id:"458",code:"MY",name:"Malaysia",population:34,gdpPerCapita:33550,co2Emissions:7.6,lifeExpectancy:76.9,humanDevIndex:.803,internetUsers:90,renewableEnergy:8,urbanPopulation:78,healthExpenditure:3.8,educationExpenditure:3.9,forestArea:57.7,accessElectricity:100},{id:"288",code:"GH",name:"Ghana",population:33,gdpPerCapita:6754,co2Emissions:.6,lifeExpectancy:64.9,humanDevIndex:.632,internetUsers:53,renewableEnergy:42,urbanPopulation:58,healthExpenditure:3.4,educationExpenditure:4,forestArea:34.5,accessElectricity:85.9},{id:"524",code:"NP",name:"Nepal",population:30,gdpPerCapita:4199,co2Emissions:.5,lifeExpectancy:71.7,humanDevIndex:.602,internetUsers:48,renewableEnergy:86,urbanPopulation:21,healthExpenditure:4.4,educationExpenditure:4.2,forestArea:25.4,accessElectricity:90},{id:"862",code:"VE",name:"Venezuela",population:29,gdpPerCapita:7045,co2Emissions:3.1,lifeExpectancy:72.1,humanDevIndex:.691,internetUsers:72,renewableEnergy:68,urbanPopulation:88.3,healthExpenditure:3.9,educationExpenditure:6.9,forestArea:52.1,accessElectricity:99.9},{id:"450",code:"MG",name:"Madagascar",population:29,gdpPerCapita:1724,co2Emissions:.2,lifeExpectancy:67,humanDevIndex:.501,internetUsers:10,renewableEnergy:68,urbanPopulation:39.5,healthExpenditure:3.9,educationExpenditure:2.9,forestArea:21.4,accessElectricity:34},{id:"120",code:"CM",name:"Cameroon",population:28,gdpPerCapita:3977,co2Emissions:.4,lifeExpectancy:60.3,humanDevIndex:.576,internetUsers:34,renewableEnergy:74,urbanPopulation:58.4,healthExpenditure:3.3,educationExpenditure:3.2,forestArea:45.6,accessElectricity:65},{id:"528",code:"NL",name:"Netherlands",population:18,gdpPerCapita:64654,co2Emissions:8.1,lifeExpectancy:82.3,humanDevIndex:.941,internetUsers:98,renewableEnergy:13,urbanPopulation:92.5,healthExpenditure:11.2,educationExpenditure:5.3,forestArea:11.2,accessElectricity:100},{id:"152",code:"CL",name:"Chile",population:19,gdpPerCapita:28526,co2Emissions:4.3,lifeExpectancy:80.7,humanDevIndex:.855,internetUsers:88,renewableEnergy:27,urbanPopulation:87.9,healthExpenditure:9.3,educationExpenditure:5.4,forestArea:24.4,accessElectricity:100},{id:"752",code:"SE",name:"Sweden",population:10,gdpPerCapita:60239,co2Emissions:3.5,lifeExpectancy:83.2,humanDevIndex:.947,internetUsers:96,renewableEnergy:56,urbanPopulation:88.2,healthExpenditure:11.4,educationExpenditure:7.6,forestArea:68.9,accessElectricity:100},{id:"578",code:"NO",name:"Norway",population:5,gdpPerCapita:82236,co2Emissions:7.5,lifeExpectancy:83.2,humanDevIndex:.961,internetUsers:98,renewableEnergy:72,urbanPopulation:83.4,healthExpenditure:11.4,educationExpenditure:7.9,forestArea:33.2,accessElectricity:100},{id:"702",code:"SG",name:"Singapore",population:6,gdpPerCapita:116527,co2Emissions:8.9,lifeExpectancy:84.1,humanDevIndex:.939,internetUsers:96,renewableEnergy:2,urbanPopulation:100,healthExpenditure:6.1,educationExpenditure:2.9,forestArea:22.5,accessElectricity:100},{id:"554",code:"NZ",name:"New Zealand",population:5,gdpPerCapita:48249,co2Emissions:6.8,lifeExpectancy:82.5,humanDevIndex:.937,internetUsers:95,renewableEnergy:40,urbanPopulation:86.7,healthExpenditure:9.7,educationExpenditure:6.3,forestArea:38.6,accessElectricity:100},{id:"372",code:"IE",name:"Ireland",population:5,gdpPerCapita:106998,co2Emissions:7.3,lifeExpectancy:82.8,humanDevIndex:.945,internetUsers:94,renewableEnergy:14,urbanPopulation:64.2,healthExpenditure:7.1,educationExpenditure:3.5,forestArea:11,accessElectricity:100},{id:"376",code:"IL",name:"Israel",population:9,gdpPerCapita:52170,co2Emissions:6.9,lifeExpectancy:83.5,humanDevIndex:.919,internetUsers:90,renewableEnergy:6,urbanPopulation:92.8,healthExpenditure:7.5,educationExpenditure:7.1,forestArea:7.6,accessElectricity:100},{id:"784",code:"AE",name:"United Arab Emirates",population:10,gdpPerCapita:77272,co2Emissions:20.7,lifeExpectancy:78.7,humanDevIndex:.911,internetUsers:100,renewableEnergy:1,urbanPopulation:87.4,healthExpenditure:5,educationExpenditure:3.9,forestArea:4.5,accessElectricity:100},{id:"756",code:"CH",name:"Switzerland",population:9,gdpPerCapita:81867,co2Emissions:4,lifeExpectancy:84,humanDevIndex:.962,internetUsers:96,renewableEnergy:28,urbanPopulation:74,healthExpenditure:11.3,educationExpenditure:5,forestArea:31.9,accessElectricity:100},{id:"040",code:"AT",name:"Austria",population:9,gdpPerCapita:58013,co2Emissions:6.8,lifeExpectancy:82,humanDevIndex:.916,internetUsers:93,renewableEnergy:36,urbanPopulation:59,healthExpenditure:10.4,educationExpenditure:5.4,forestArea:47.3,accessElectricity:100},{id:"620",code:"PT",name:"Portugal",population:10,gdpPerCapita:38147,co2Emissions:4,lifeExpectancy:82.6,humanDevIndex:.866,internetUsers:85,renewableEnergy:34,urbanPopulation:66.8,healthExpenditure:10.6,educationExpenditure:5,forestArea:36.1,accessElectricity:100},{id:"300",code:"GR",name:"Greece",population:10,gdpPerCapita:33393,co2Emissions:5.3,lifeExpectancy:81.4,humanDevIndex:.887,internetUsers:79,renewableEnergy:22,urbanPopulation:80.1,healthExpenditure:7.8,educationExpenditure:4.4,forestArea:32.5,accessElectricity:100},{id:"203",code:"CZ",name:"Czech Republic",population:11,gdpPerCapita:45499,co2Emissions:9.3,lifeExpectancy:79.4,humanDevIndex:.889,internetUsers:88,renewableEnergy:17,urbanPopulation:74.1,healthExpenditure:9.2,educationExpenditure:4.4,forestArea:34.7,accessElectricity:100},{id:"056",code:"BE",name:"Belgium",population:12,gdpPerCapita:55521,co2Emissions:8,lifeExpectancy:82.2,humanDevIndex:.937,internetUsers:94,renewableEnergy:13,urbanPopulation:98.1,healthExpenditure:11.1,educationExpenditure:6.4,forestArea:22.8,accessElectricity:100},{id:"348",code:"HU",name:"Hungary",population:10,gdpPerCapita:37935,co2Emissions:4.6,lifeExpectancy:77,humanDevIndex:.846,internetUsers:89,renewableEnergy:14,urbanPopulation:72.3,healthExpenditure:6.4,educationExpenditure:4.6,forestArea:22.9,accessElectricity:100},{id:"246",code:"FI",name:"Finland",population:6,gdpPerCapita:53654,co2Emissions:6.5,lifeExpectancy:82.2,humanDevIndex:.94,internetUsers:96,renewableEnergy:44,urbanPopulation:85.5,healthExpenditure:9.6,educationExpenditure:6.3,forestArea:73.7,accessElectricity:100},{id:"208",code:"DK",name:"Denmark",population:6,gdpPerCapita:67803,co2Emissions:4.4,lifeExpectancy:81.6,humanDevIndex:.948,internetUsers:98,renewableEnergy:40,urbanPopulation:88.2,healthExpenditure:10.5,educationExpenditure:6.9,forestArea:14.7,accessElectricity:100},{id:"352",code:"IS",name:"Iceland",population:.4,gdpPerCapita:68727,co2Emissions:9.7,lifeExpectancy:83.1,humanDevIndex:.959,internetUsers:99,renewableEnergy:85,urbanPopulation:93.9,healthExpenditure:8.9,educationExpenditure:7.7,forestArea:.5,accessElectricity:100},{id:"180",code:"CD",name:"DR Congo",population:99,gdpPerCapita:1099,co2Emissions:.04,lifeExpectancy:60.7,humanDevIndex:.479,internetUsers:9,renewableEnergy:97,urbanPopulation:46.2,healthExpenditure:3.3,educationExpenditure:1.5,forestArea:67.3,accessElectricity:19.1},{id:"729",code:"SD",name:"Sudan",population:46,gdpPerCapita:4232,co2Emissions:.5,lifeExpectancy:66.1,humanDevIndex:.508,internetUsers:31,renewableEnergy:62,urbanPopulation:35.6,healthExpenditure:4.5,educationExpenditure:2.2,forestArea:9.7,accessElectricity:55.5},{id:"024",code:"AO",name:"Angola",population:35,gdpPerCapita:6938,co2Emissions:.8,lifeExpectancy:62,humanDevIndex:.586,internetUsers:36,renewableEnergy:55,urbanPopulation:68.1,healthExpenditure:2.6,educationExpenditure:2.4,forestArea:46.3,accessElectricity:46},{id:"508",code:"MZ",name:"Mozambique",population:33,gdpPerCapita:1346,co2Emissions:.2,lifeExpectancy:60.9,humanDevIndex:.456,internetUsers:10,renewableEnergy:79,urbanPopulation:38,healthExpenditure:7.5,educationExpenditure:5.5,forestArea:48.2,accessElectricity:31},{id:"384",code:"CI",name:"Ivory Coast",population:28,gdpPerCapita:5972,co2Emissions:.4,lifeExpectancy:59.3,humanDevIndex:.55,internetUsers:45,renewableEnergy:68,urbanPopulation:52.7,healthExpenditure:3.3,educationExpenditure:3.4,forestArea:9.3,accessElectricity:70},{id:"562",code:"NE",name:"Niger",population:26,gdpPerCapita:1318,co2Emissions:.1,lifeExpectancy:63,humanDevIndex:.4,internetUsers:5,renewableEnergy:80,urbanPopulation:16.8,healthExpenditure:5.2,educationExpenditure:3.5,forestArea:.9,accessElectricity:19.3},{id:"854",code:"BF",name:"Burkina Faso",population:22,gdpPerCapita:2445,co2Emissions:.2,lifeExpectancy:62.7,humanDevIndex:.449,internetUsers:18,renewableEnergy:79,urbanPopulation:31.5,healthExpenditure:5.6,educationExpenditure:5.4,forestArea:19.3,accessElectricity:19},{id:"466",code:"ML",name:"Mali",population:22,gdpPerCapita:2462,co2Emissions:.2,lifeExpectancy:59.3,humanDevIndex:.428,internetUsers:27,renewableEnergy:76,urbanPopulation:44.6,healthExpenditure:3.8,educationExpenditure:3.8,forestArea:3.9,accessElectricity:53},{id:"686",code:"SN",name:"Senegal",population:17,gdpPerCapita:3942,co2Emissions:.7,lifeExpectancy:68.6,humanDevIndex:.511,internetUsers:58,renewableEnergy:47,urbanPopulation:48.6,healthExpenditure:3.5,educationExpenditure:5.5,forestArea:42.5,accessElectricity:70.4},{id:"894",code:"ZM",name:"Zambia",population:20,gdpPerCapita:3574,co2Emissions:.4,lifeExpectancy:65,humanDevIndex:.565,internetUsers:16,renewableEnergy:88,urbanPopulation:45.2,healthExpenditure:4.9,educationExpenditure:4.6,forestArea:59.8,accessElectricity:43},{id:"716",code:"ZW",name:"Zimbabwe",population:16,gdpPerCapita:2622,co2Emissions:.8,lifeExpectancy:61.5,humanDevIndex:.593,internetUsers:35,renewableEnergy:78,urbanPopulation:32.2,healthExpenditure:3.4,educationExpenditure:5,forestArea:36.4,accessElectricity:49},{id:"646",code:"RW",name:"Rwanda",population:14,gdpPerCapita:2359,co2Emissions:.1,lifeExpectancy:69.6,humanDevIndex:.534,internetUsers:30,renewableEnergy:84,urbanPopulation:17.6,healthExpenditure:7.5,educationExpenditure:3.1,forestArea:28.8,accessElectricity:48},{id:"004",code:"AF",name:"Afghanistan",population:41,gdpPerCapita:2065,co2Emissions:.2,lifeExpectancy:62,humanDevIndex:.478,internetUsers:18,renewableEnergy:45,urbanPopulation:26.3,healthExpenditure:18.2,educationExpenditure:4.1,forestArea:1.9,accessElectricity:97.7},{id:"104",code:"MM",name:"Myanmar",population:55,gdpPerCapita:5699,co2Emissions:.6,lifeExpectancy:67.8,humanDevIndex:.585,internetUsers:44,renewableEnergy:51,urbanPopulation:31.4,healthExpenditure:4.8,educationExpenditure:2,forestArea:42.2,accessElectricity:70},{id:"408",code:"KP",name:"North Korea",population:26,gdpPerCapita:1800,co2Emissions:2,lifeExpectancy:72.6,humanDevIndex:.733,internetUsers:0,renewableEnergy:12,urbanPopulation:63,healthExpenditure:6,educationExpenditure:4,forestArea:41,accessElectricity:26},{id:"496",code:"MN",name:"Mongolia",population:3.4,gdpPerCapita:12896,co2Emissions:14,lifeExpectancy:70.9,humanDevIndex:.739,internetUsers:84,renewableEnergy:7,urbanPopulation:68.8,healthExpenditure:4,educationExpenditure:4.7,forestArea:7.1,accessElectricity:100},{id:"144",code:"LK",name:"Sri Lanka",population:22,gdpPerCapita:14509,co2Emissions:1,lifeExpectancy:77.4,humanDevIndex:.782,internetUsers:47,renewableEnergy:51,urbanPopulation:18.9,healthExpenditure:3.8,educationExpenditure:2.1,forestArea:29.4,accessElectricity:100},{id:"398",code:"KZ",name:"Kazakhstan",population:19,gdpPerCapita:30500,co2Emissions:13.2,lifeExpectancy:74.4,humanDevIndex:.811,internetUsers:91,renewableEnergy:2,urbanPopulation:57.8,healthExpenditure:2.8,educationExpenditure:2.9,forestArea:1.2,accessElectricity:100},{id:"860",code:"UZ",name:"Uzbekistan",population:35,gdpPerCapita:9127,co2Emissions:3.5,lifeExpectancy:73.8,humanDevIndex:.727,internetUsers:71,renewableEnergy:11,urbanPopulation:50.4,healthExpenditure:6.8,educationExpenditure:5.3,forestArea:7.7,accessElectricity:100},{id:"192",code:"CU",name:"Cuba",population:11,gdpPerCapita:9478,co2Emissions:2.3,lifeExpectancy:79,humanDevIndex:.764,internetUsers:71,renewableEnergy:32,urbanPopulation:77.2,healthExpenditure:11.7,educationExpenditure:12.8,forestArea:33,accessElectricity:100},{id:"218",code:"EC",name:"Ecuador",population:18,gdpPerCapita:12171,co2Emissions:2.3,lifeExpectancy:77.9,humanDevIndex:.74,internetUsers:70,renewableEnergy:31,urbanPopulation:64.2,healthExpenditure:8.3,educationExpenditure:4.4,forestArea:50.1,accessElectricity:100},{id:"320",code:"GT",name:"Guatemala",population:18,gdpPerCapita:9547,co2Emissions:1,lifeExpectancy:74.3,humanDevIndex:.627,internetUsers:51,renewableEnergy:62,urbanPopulation:52.4,healthExpenditure:5.8,educationExpenditure:3.4,forestArea:33,accessElectricity:98},{id:"068",code:"BO",name:"Bolivia",population:12,gdpPerCapita:9484,co2Emissions:1.8,lifeExpectancy:72.1,humanDevIndex:.692,internetUsers:66,renewableEnergy:24,urbanPopulation:70.4,healthExpenditure:6.9,educationExpenditure:7.3,forestArea:50.1,accessElectricity:99.3},{id:"340",code:"HN",name:"Honduras",population:10,gdpPerCapita:6289,co2Emissions:1,lifeExpectancy:75.3,humanDevIndex:.621,internetUsers:48,renewableEnergy:61,urbanPopulation:59,healthExpenditure:7.9,educationExpenditure:6.1,forestArea:38.1,accessElectricity:94},{id:"600",code:"PY",name:"Paraguay",population:7,gdpPerCapita:15030,co2Emissions:1.1,lifeExpectancy:74.3,humanDevIndex:.717,internetUsers:77,renewableEnergy:78,urbanPopulation:62.5,healthExpenditure:7.6,educationExpenditure:3.4,forestArea:38.6,accessElectricity:100},{id:"858",code:"UY",name:"Uruguay",population:3.5,gdpPerCapita:25041,co2Emissions:2,lifeExpectancy:78.4,humanDevIndex:.83,internetUsers:87,renewableEnergy:55,urbanPopulation:95.6,healthExpenditure:9.3,educationExpenditure:5,forestArea:10.5,accessElectricity:100},{id:"188",code:"CR",name:"Costa Rica",population:5,gdpPerCapita:23101,co2Emissions:1.5,lifeExpectancy:80.8,humanDevIndex:.809,internetUsers:81,renewableEnergy:73,urbanPopulation:81.4,healthExpenditure:7.3,educationExpenditure:6.7,forestArea:59,accessElectricity:100},{id:"591",code:"PA",name:"Panama",population:4.4,gdpPerCapita:35317,co2Emissions:2.5,lifeExpectancy:79.2,humanDevIndex:.805,internetUsers:68,renewableEnergy:35,urbanPopulation:68.4,healthExpenditure:7.3,educationExpenditure:3.2,forestArea:62.1,accessElectricity:95}],_a=[{id:"humanDevIndex",name:"Human Development Index",unit:"",description:"UN composite index of life expectancy, education, and income",colorScale:["#fee5d9","#fcae91","#cb181d"],domain:[.4,1],accessor:a=>a.humanDevIndex,format:a=>a.toFixed(3)},{id:"gdpPerCapita",name:"GDP per Capita (PPP)",unit:"$",description:"Purchasing power parity adjusted GDP per person",colorScale:["#edf8e9","#74c476","#006d2c"],domain:[1e3,8e4],accessor:a=>a.gdpPerCapita,format:a=>`$${(a/1e3).toFixed(1)}k`},{id:"co2Emissions",name:"CO₂ Emissions",unit:"t/capita",description:"Carbon dioxide emissions per capita",colorScale:["#f7fbff","#6baed6","#08306b"],domain:[0,20],accessor:a=>a.co2Emissions,format:a=>`${a.toFixed(1)}t`},{id:"lifeExpectancy",name:"Life Expectancy",unit:"years",description:"Average life expectancy at birth",colorScale:["#feedde","#fdbe85","#d94701"],domain:[55,85],accessor:a=>a.lifeExpectancy,format:a=>`${a.toFixed(1)} yrs`},{id:"renewableEnergy",name:"Renewable Energy",unit:"%",description:"Share of renewable energy in total energy consumption",colorScale:["#f7fcf5","#74c476","#00441b"],domain:[0,100],accessor:a=>a.renewableEnergy,format:a=>`${a.toFixed(0)}%`},{id:"internetUsers",name:"Internet Penetration",unit:"%",description:"Percentage of population using the internet",colorScale:["#f2f0f7","#9e9ac8","#54278f"],domain:[0,100],accessor:a=>a.internetUsers,format:a=>`${a.toFixed(0)}%`},{id:"urbanPopulation",name:"Urbanization",unit:"%",description:"Percentage of population living in urban areas",colorScale:["#fff5eb","#fd8d3c","#7f2704"],domain:[15,100],accessor:a=>a.urbanPopulation,format:a=>`${a.toFixed(0)}%`},{id:"healthExpenditure",name:"Health Spending",unit:"% GDP",description:"Total health expenditure as percentage of GDP",colorScale:["#fff5f0","#fb6a4a","#99000d"],domain:[2,18],accessor:a=>a.healthExpenditure,format:a=>`${a.toFixed(1)}%`},{id:"forestArea",name:"Forest Coverage",unit:"%",description:"Forest area as percentage of total land area",colorScale:["#f7fcf5","#41ab5d","#00441b"],domain:[0,75],accessor:a=>a.forestArea,format:a=>`${a.toFixed(0)}%`},{id:"accessElectricity",name:"Electricity Access",unit:"%",description:"Percentage of population with access to electricity",colorScale:["#ffffd4","#fed98e","#cc4c02"],domain:[15,100],accessor:a=>a.accessElectricity,format:a=>`${a.toFixed(0)}%`}];function ya(a,e){const[t,i]=a.domain;return Math.max(0,Math.min(1,(e-t)/(i-t)))}const Gt=2048,jt=1024;class xa{canvas;ctx;countries=[];loaded=!1;statsMap;constructor(){this.canvas=document.createElement("canvas"),this.canvas.width=Gt,this.canvas.height=jt,this.ctx=this.canvas.getContext("2d"),this.statsMap=new Map,$i.forEach(e=>{this.statsMap.set(e.id,e)}),this.loadCountries()}async loadCountries(){try{const t=await(await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")).json(),i=ma(t,t.objects.countries);this.countries=i.features,this.loaded=!0,console.log(`Loaded ${this.countries.length} country boundaries`)}catch(e){console.error("Failed to load country boundaries:",e)}}async waitForLoad(){for(;!this.loaded;)await new Promise(e=>setTimeout(e,100))}renderTexture(e){return this.ctx.fillStyle="#1a3a5c",this.ctx.fillRect(0,0,Gt,jt),this.loaded?(this.countries.forEach(t=>{const i=this.statsMap.get(t.id);if(i){const n=e.accessor(i),r=ya(e,n),s=this.interpolateColor(e.colorScale,r);this.ctx.fillStyle=s}else this.ctx.fillStyle="#2a2a2a";this.drawCountry(t)}),this.ctx.strokeStyle="rgba(0, 0, 0, 0.3)",this.ctx.lineWidth=.5,this.countries.forEach(t=>{this.strokeCountry(t)}),this.canvas):this.canvas}drawCountry(e){const{geometry:t}=e;t.type==="Polygon"?this.drawPolygon(t.coordinates):t.type==="MultiPolygon"&&t.coordinates.forEach(i=>{this.drawPolygon(i)})}strokeCountry(e){const{geometry:t}=e;t.type==="Polygon"?this.strokePolygon(t.coordinates):t.type==="MultiPolygon"&&t.coordinates.forEach(i=>{this.strokePolygon(i)})}drawPolygon(e){this.ctx.beginPath(),e.forEach(t=>{let i=null;t.forEach((n,r)=>{const s=n[0],o=n[1],[l,h]=this.projectPoint(s,o),c=i!==null&&Math.abs(s-i)>180;r===0?this.ctx.moveTo(l,h):c?this.ctx.moveTo(l,h):this.ctx.lineTo(l,h),i=s}),this.ctx.closePath()}),this.ctx.fill("evenodd")}strokePolygon(e){e.forEach(t=>{this.ctx.beginPath();let i=null;t.forEach((n,r)=>{const s=n[0],o=n[1],[l,h]=this.projectPoint(s,o),c=i!==null&&Math.abs(s-i)>180;r===0?this.ctx.moveTo(l,h):c?(this.ctx.stroke(),this.ctx.beginPath(),this.ctx.moveTo(l,h)):this.ctx.lineTo(l,h),i=s}),this.ctx.stroke()})}projectPoint(e,t){const i=(e+180)/360*Gt,n=(90-t)/180*jt;return[i,n]}interpolateColor(e,t){const i=c=>({r:parseInt(c.slice(1,3),16),g:parseInt(c.slice(3,5),16),b:parseInt(c.slice(5,7),16)}),[n,r,s]=e.map(i);let o,l,h;if(t<.5){const c=t*2;o=Math.round(n.r+(r.r-n.r)*c),l=Math.round(n.g+(r.g-n.g)*c),h=Math.round(n.b+(r.b-n.b)*c)}else{const c=(t-.5)*2;o=Math.round(r.r+(s.r-r.r)*c),l=Math.round(r.g+(s.g-r.g)*c),h=Math.round(r.b+(s.b-r.b)*c)}return`rgb(${o}, ${l}, ${h})`}renderCustomTexture(e,t,i){if(this.ctx.fillStyle="#1a3a5c",this.ctx.fillRect(0,0,Gt,jt),!this.loaded)return this.canvas;const n=e instanceof Map?Object.fromEntries(e):e;return this.countries.forEach(r=>{const s=n[r.id];if(s!==void 0){const o=Math.max(0,Math.min(1,(s-i[0])/(i[1]-i[0]))),l=this.interpolateColor(t,o);this.ctx.fillStyle=l}else this.ctx.fillStyle="#2a2a2a";this.drawCountry(r)}),this.ctx.strokeStyle="rgba(0, 0, 0, 0.3)",this.ctx.lineWidth=.5,this.countries.forEach(r=>{this.strokeCountry(r)}),this.canvas}getCanvas(){return this.canvas}getDataURL(){return this.canvas.toDataURL("image/png")}}class ba{container;visible=!1;constructor(){this.container=document.createElement("div"),this.container.id="legend",this.container.innerHTML=`
      <div class="legend-hint">Press G to toggle globe/flat</div>
      <div class="legend-title"></div>
      <div class="legend-gradient"></div>
      <div class="legend-labels">
        <span class="legend-min"></span>
        <span class="legend-max"></span>
      </div>
      <div class="legend-description"></div>
    `,this.applyStyles(),document.body.appendChild(this.container)}applyStyles(){const e=document.createElement("style");e.textContent=`
      #legend {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 10, 20, 0.9);
        border: 1px solid rgba(100, 150, 200, 0.3);
        border-radius: 8px;
        padding: 12px 16px;
        min-width: 180px;
        font-family: system-ui, sans-serif;
        color: #ddd;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none;
        z-index: 100;
      }

      #legend.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .legend-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #4af;
      }

      .legend-gradient {
        height: 12px;
        border-radius: 4px;
        margin-bottom: 4px;
      }

      .legend-labels {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #aaa;
        margin-bottom: 8px;
      }

      .legend-description {
        font-size: 11px;
        color: #888;
        font-style: italic;
      }

      .legend-hint {
        font-size: 10px;
        color: #666;
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(100, 150, 200, 0.2);
      }
    `,document.head.appendChild(e)}show(e){const t=this.container.querySelector(".legend-title"),i=this.container.querySelector(".legend-gradient"),n=this.container.querySelector(".legend-min"),r=this.container.querySelector(".legend-max"),s=this.container.querySelector(".legend-description");t.textContent=e.name,s.textContent=e.description;const[o,l,h]=e.colorScale;i.style.background=`linear-gradient(to right, ${o}, ${l}, ${h})`,n.textContent=e.format(e.domain[0]),r.textContent=e.format(e.domain[1]),this.container.classList.add("visible"),this.visible=!0}hide(){this.container.classList.remove("visible"),this.visible=!1}isVisible(){return this.visible}dispose(){this.container.remove()}}var va={trailer:59};function dr(a=256){let e=0,t=new Uint8Array(a);return{get buffer(){return t.buffer},reset(){e=0},bytesView(){return t.subarray(0,e)},bytes(){return t.slice(0,e)},writeByte(n){i(e+1),t[e]=n,e++},writeBytes(n,r=0,s=n.length){i(e+s);for(let o=0;o<s;o++)t[e++]=n[o+r]},writeBytesView(n,r=0,s=n.byteLength){i(e+s),t.set(n.subarray(r,r+s),e),e+=s}};function i(n){var r=t.length;if(r>=n)return;var s=1024*1024;n=Math.max(n,r*(r<s?2:1.125)>>>0),r!=0&&(n=Math.max(n,256));let o=t;t=new Uint8Array(n),e>0&&t.set(o.subarray(0,e),0)}}var Bi=12,pr=5003,Ea=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];function wa(a,e,t,i,n=dr(512),r=new Uint8Array(256),s=new Int32Array(pr),o=new Int32Array(pr)){let l=s.length,h=Math.max(2,i);r.fill(0),o.fill(0),s.fill(-1);let c=0,u=0,p=h+1,m=p,f=!1,d=m,g=(1<<d)-1,_=1<<p-1,y=_+1,x=_+2,b=0,v=t[0],P=0;for(let E=l;E<65536;E*=2)++P;P=8-P,n.writeByte(h),C(_);let w=t.length;for(let E=1;E<w;E++)e:{let T=t[E],O=(T<<Bi)+v,A=T<<P^v;if(s[A]===O){v=o[A];break e}let k=A===0?1:l-A;for(;s[A]>=0;)if(A-=k,A<0&&(A+=l),s[A]===O){v=o[A];break e}C(v),v=T,x<1<<Bi?(o[A]=x++,s[A]=O):(s.fill(-1),x=_+2,f=!0,C(_))}return C(v),C(y),n.writeByte(0),n.bytesView();function C(E){for(c&=Ea[u],u>0?c|=E<<u:c=E,u+=d;u>=8;)r[b++]=c&255,b>=254&&(n.writeByte(b),n.writeBytesView(r,0,b),b=0),c>>=8,u-=8;if((x>g||f)&&(f?(d=m,g=(1<<d)-1,f=!1):(++d,g=d===Bi?1<<d:(1<<d)-1)),E==y){for(;u>0;)r[b++]=c&255,b>=254&&(n.writeByte(b),n.writeBytesView(r,0,b),b=0),c>>=8,u-=8;b>0&&(n.writeByte(b),n.writeBytesView(r,0,b),b=0)}}}var Pa=wa;function fr(a,e,t){return a<<8&63488|e<<2&992|t>>3}function mr(a,e,t,i){return a>>4|e&240|(t&240)<<4|(i&240)<<8}function gr(a,e,t){return a>>4<<8|e&240|t>>4}function Yt(a,e,t){return a<e?e:a>t?t:a}function Zt(a){return a*a}function _r(a,e,t){var i=0,n=1e100;let r=a[e],s=r.cnt;r.ac;let o=r.rc,l=r.gc,h=r.bc;for(var c=r.fw;c!=0;c=a[c].fw){let p=a[c],m=p.cnt,f=s*m/(s+m);if(!(f>=n)){var u=0;u+=f*Zt(p.rc-o),!(u>=n)&&(u+=f*Zt(p.gc-l),!(u>=n)&&(u+=f*Zt(p.bc-h),!(u>=n)&&(n=u,i=c)))}}r.err=n,r.nn=i}function Vi(){return{ac:0,rc:0,gc:0,bc:0,cnt:0,nn:0,fw:0,bk:0,tm:0,mtm:0,err:0}}function Ca(a,e){let t=e==="rgb444"?4096:65536,i=new Array(t),n=a.length;if(e==="rgba4444")for(let r=0;r<n;++r){let s=a[r],o=s>>24&255,l=s>>16&255,h=s>>8&255,c=s&255,u=mr(c,h,l,o),p=u in i?i[u]:i[u]=Vi();p.rc+=c,p.gc+=h,p.bc+=l,p.ac+=o,p.cnt++}else if(e==="rgb444")for(let r=0;r<n;++r){let s=a[r],o=s>>16&255,l=s>>8&255,h=s&255,c=gr(h,l,o),u=c in i?i[c]:i[c]=Vi();u.rc+=h,u.gc+=l,u.bc+=o,u.cnt++}else for(let r=0;r<n;++r){let s=a[r],o=s>>16&255,l=s>>8&255,h=s&255,c=fr(h,l,o),u=c in i?i[c]:i[c]=Vi();u.rc+=h,u.gc+=l,u.bc+=o,u.cnt++}return i}function Sa(a,e,t={}){let{format:i="rgb565",clearAlpha:n=!0,clearAlphaColor:r=0,clearAlphaThreshold:s=0,oneBitAlpha:o=!1}=t;if(!a||!a.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(a instanceof Uint8Array)&&!(a instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");let l=new Uint32Array(a.buffer),h=t.useSqrt!==!1,c=i==="rgba4444",u=Ca(l,i),p=u.length,m=p-1,f=new Uint32Array(p+1);for(var d=0,g=0;g<p;++g){let I=u[g];if(I!=null){var _=1/I.cnt;c&&(I.ac*=_),I.rc*=_,I.gc*=_,I.bc*=_,u[d++]=I}}Zt(e)/d<.022&&(h=!1);for(var g=0;g<d-1;++g)u[g].fw=g+1,u[g+1].bk=g,h&&(u[g].cnt=Math.sqrt(u[g].cnt));h&&(u[g].cnt=Math.sqrt(u[g].cnt));var y,x,b;for(g=0;g<d;++g){_r(u,g);var v=u[g].err;for(x=++f[0];x>1&&(b=x>>1,!(u[y=f[b]].err<=v));x=b)f[x]=y;f[x]=g}var P=d-e;for(g=0;g<P;){for(var w;;){var C=f[1];if(w=u[C],w.tm>=w.mtm&&u[w.nn].mtm<=w.tm)break;w.mtm==m?C=f[1]=f[f[0]--]:(_r(u,C),w.tm=g);var v=u[C].err;for(x=1;(b=x+x)<=f[0]&&(b<f[0]&&u[f[b]].err>u[f[b+1]].err&&b++,!(v<=u[y=f[b]].err));x=b)f[x]=y;f[x]=C}var E=u[w.nn],T=w.cnt,O=E.cnt,_=1/(T+O);c&&(w.ac=_*(T*w.ac+O*E.ac)),w.rc=_*(T*w.rc+O*E.rc),w.gc=_*(T*w.gc+O*E.gc),w.bc=_*(T*w.bc+O*E.bc),w.cnt+=E.cnt,w.mtm=++g,u[E.bk].fw=E.fw,u[E.fw].bk=E.bk,E.mtm=m}let A=[];var k=0;for(g=0;;++k){let I=Yt(Math.round(u[g].rc),0,255),G=Yt(Math.round(u[g].gc),0,255),N=Yt(Math.round(u[g].bc),0,255),F=255;c&&(F=Yt(Math.round(u[g].ac),0,255),o&&(F=F<=(typeof o=="number"?o:127)?0:255),n&&F<=s&&(I=G=N=r,F=0));let se=c?[I,G,N,F]:[I,G,N];if(Aa(A,se)||A.push(se),(g=u[g].fw)==0)break}return A}function Aa(a,e){for(let t=0;t<a.length;t++){let i=a[t],n=i[0]===e[0]&&i[1]===e[1]&&i[2]===e[2],r=i.length>=4&&e.length>=4?i[3]===e[3]:!0;if(n&&r)return!0}return!1}function Ta(a,e,t="rgb565"){if(!a||!a.buffer)throw new Error("quantize() expected RGBA Uint8Array data");if(!(a instanceof Uint8Array)&&!(a instanceof Uint8ClampedArray))throw new Error("quantize() expected RGBA Uint8Array data");if(e.length>256)throw new Error("applyPalette() only works with 256 colors or less");let i=new Uint32Array(a.buffer),n=i.length,r=t==="rgb444"?4096:65536,s=new Uint8Array(n),o=new Array(r);if(t==="rgba4444")for(let l=0;l<n;l++){let h=i[l],c=h>>24&255,u=h>>16&255,p=h>>8&255,m=h&255,f=mr(m,p,u,c),d=f in o?o[f]:o[f]=Da(m,p,u,c,e);s[l]=d}else{let l=t==="rgb444"?gr:fr;for(let h=0;h<n;h++){let c=i[h],u=c>>16&255,p=c>>8&255,m=c&255,f=l(m,p,u),d=f in o?o[f]:o[f]=Ma(m,p,u,e);s[h]=d}}return s}function Da(a,e,t,i,n){let r=0,s=1e100;for(let o=0;o<n.length;o++){let l=n[o],h=l[3],c=Ze(h-i);if(c>s)continue;let u=l[0];if(c+=Ze(u-a),c>s)continue;let p=l[1];if(c+=Ze(p-e),c>s)continue;let m=l[2];c+=Ze(m-t),!(c>s)&&(s=c,r=o)}return r}function Ma(a,e,t,i){let n=0,r=1e100;for(let s=0;s<i.length;s++){let o=i[s],l=o[0],h=Ze(l-a);if(h>r)continue;let c=o[1];if(h+=Ze(c-e),h>r)continue;let u=o[2];h+=Ze(u-t),!(h>r)&&(r=h,n=s)}return n}function Ze(a){return a*a}function Oa(a={}){let{initialCapacity:e=4096,auto:t=!0}=a,i=dr(e),n=5003,r=new Uint8Array(256),s=new Int32Array(n),o=new Int32Array(n),l=!1;return{reset(){i.reset(),l=!1},finish(){i.writeByte(va.trailer)},bytes(){return i.bytes()},bytesView(){return i.bytesView()},get buffer(){return i.buffer},get stream(){return i},writeHeader:h,writeFrame(c,u,p,m={}){let{transparent:f=!1,transparentIndex:d=0,delay:g=0,palette:_=null,repeat:y=0,colorDepth:x=8,dispose:b=-1}=m,v=!1;if(t?l||(v=!0,h(),l=!0):v=!!m.first,u=Math.max(0,Math.floor(u)),p=Math.max(0,Math.floor(p)),v){if(!_)throw new Error("First frame must include a { palette } option");Ia(i,u,p,_,x),yr(i,_),y>=0&&Ra(i,y)}let P=Math.round(g/10);ka(i,b,P,f,d);let w=!!_&&!v;La(i,u,p,w?_:null),w&&yr(i,_),Ua(i,c,u,p,x,r,s,o)}};function h(){xr(i,"GIF89a")}}function ka(a,e,t,i,n){a.writeByte(33),a.writeByte(249),a.writeByte(4),n<0&&(n=0,i=!1);var r,s;i?(r=1,s=2):(r=0,s=0),e>=0&&(s=e&7),s<<=2,a.writeByte(0|s|0|r),Le(a,t),a.writeByte(n||0),a.writeByte(0)}function Ia(a,e,t,i,n=8){let r=1,s=0,o=Gi(i.length)-1,l=r<<7|n-1<<4|s<<3|o;Le(a,e),Le(a,t),a.writeBytes([l,0,0])}function Ra(a,e){a.writeByte(33),a.writeByte(255),a.writeByte(11),xr(a,"NETSCAPE2.0"),a.writeByte(3),a.writeByte(1),Le(a,e),a.writeByte(0)}function yr(a,e){let t=1<<Gi(e.length);for(let i=0;i<t;i++){let n=[0,0,0];i<e.length&&(n=e[i]),a.writeByte(n[0]),a.writeByte(n[1]),a.writeByte(n[2])}}function La(a,e,t,i){if(a.writeByte(44),Le(a,0),Le(a,0),Le(a,e),Le(a,t),i){let n=0,r=0,s=Gi(i.length)-1;a.writeByte(128|n|r|0|s)}else a.writeByte(0)}function Ua(a,e,t,i,n=8,r,s,o){Pa(t,i,e,n,a,r,s,o)}function Le(a,e){a.writeByte(e&255),a.writeByte(e>>8&255)}function xr(a,e){for(var t=0;t<e.length;t++)a.writeByte(e.charCodeAt(t))}function Gi(a){return Math.max(Math.ceil(Math.log2(a)),1)}class Fa{renderer;scene;camera;isRecording=!1;frames=[];mediaRecorder=null;recordedChunks=[];captureCanvas;captureCtx;gifWidth=480;gifHeight=270;constructor(e,t,i){this.renderer=e,this.scene=t,this.camera=i,this.captureCanvas=document.createElement("canvas"),this.captureCtx=this.captureCanvas.getContext("2d",{willReadFrequently:!0})}screenshot(e={}){const{width:t=1920,height:i=1080}=e,n=this.renderer.domElement.width,r=this.renderer.domElement.height;this.renderer.setSize(t,i),this.camera.aspect=t/i,this.camera.updateProjectionMatrix(),this.renderer.render(this.scene,this.camera);const s=this.renderer.domElement.toDataURL("image/png");this.renderer.setSize(n,r),this.camera.aspect=n/r,this.camera.updateProjectionMatrix(),this.downloadFile(s,`globe-${Date.now()}.png`)}startVideoRecording(e={}){return new Promise(t=>{if(this.isRecording){t();return}const n=this.renderer.domElement.captureStream(60);this.mediaRecorder=new MediaRecorder(n,{mimeType:"video/webm;codecs=vp9",videoBitsPerSecond:8e6}),this.recordedChunks=[],this.mediaRecorder.ondataavailable=r=>{r.data.size>0&&this.recordedChunks.push(r.data)},this.mediaRecorder.onstop=()=>{const r=new Blob(this.recordedChunks,{type:"video/webm"}),s=URL.createObjectURL(r);this.downloadFile(s,`globe-${Date.now()}.webm`),URL.revokeObjectURL(s)},this.mediaRecorder.onstart=()=>{this.isRecording=!0,t()},this.mediaRecorder.start(100)})}stopVideoRecording(){!this.isRecording||!this.mediaRecorder||(this.mediaRecorder.stop(),this.isRecording=!1)}startGifCapture(e={}){if(this.isRecording)return;this.frames=[],this.isRecording=!0;const{width:t=480,height:i=270}=e;this.gifWidth=t,this.gifHeight=i,this.captureCanvas.width=t,this.captureCanvas.height=i}captureGifFrame(){if(!this.isRecording)return;const e=this.renderer.domElement,t=this.gifWidth,i=this.gifHeight;this.captureCtx.drawImage(e,0,0,t,i);const n=this.captureCtx.getImageData(0,0,t,i);this.frames.push({data:new Uint8ClampedArray(n.data),width:t,height:i})}async stopGifCapture(e={}){if(!this.isRecording)return;if(this.isRecording=!1,this.frames.length===0){console.warn("No frames captured for GIF");return}const{fps:t=20,filename:i}=e,n=Math.round(1e3/t);console.log(`Generating GIF with ${this.frames.length} frames at ${t} fps...`);try{const r=this.frames[0],s=r.width,o=r.height,l=Sa(r.data,256),h=Oa();for(let f=0;f<this.frames.length;f++){const d=this.frames[f],g=Ta(d.data,l);h.writeFrame(g,s,o,{palette:f===0?l:void 0,delay:n,repeat:f===0?0:void 0}),f%10===0&&await new Promise(_=>setTimeout(_,0))}h.finish();const c=h.bytes(),u=new Blob([c],{type:"image/gif"}),p=URL.createObjectURL(u),m=i||`globe-${Date.now()}.gif`;this.downloadFile(p,m),setTimeout(()=>URL.revokeObjectURL(p),1e3),console.log(`GIF saved: ${m} (${this.frames.length} frames, ${(u.size/1024).toFixed(1)}KB)`)}catch(r){console.error("Failed to generate GIF:",r)}this.frames=[]}getIsRecording(){return this.isRecording}getFrameCount(){return this.frames.length}downloadFile(e,t){const i=document.createElement("a");i.href=e,i.download=t,i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)}}class za extends S.Object3D{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new S.Vector2(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const lt=new S.Vector3,br=new S.Matrix4,vr=new S.Matrix4,Er=new S.Vector3,wr=new S.Vector3;class Na{constructor(e={}){const t=this;let i,n,r,s;const o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:i,height:n}},this.render=function(f,d){f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),d.parent===null&&d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),br.copy(d.matrixWorldInverse),vr.multiplyMatrices(d.projectionMatrix,br),c(f,f,d),this.sortObjects&&m(f)},this.setSize=function(f,d){i=f,n=d,r=i/2,s=n/2,l.style.width=f+"px",l.style.height=d+"px"};function h(f){f.isCSS2DObject&&(f.element.style.display="none");for(let d=0,g=f.children.length;d<g;d++)h(f.children[d])}function c(f,d,g){if(f.visible===!1){h(f);return}if(f.isCSS2DObject){lt.setFromMatrixPosition(f.matrixWorld),lt.applyMatrix4(vr);const _=lt.z>=-1&&lt.z<=1&&f.layers.test(g.layers)===!0,y=f.element;y.style.display=_===!0?"":"none",_===!0&&(f.onBeforeRender(t,d,g),y.style.transform="translate("+-100*f.center.x+"%,"+-100*f.center.y+"%)translate("+(lt.x*r+r)+"px,"+(-lt.y*s+s)+"px)",y.parentNode!==l&&l.appendChild(y),f.onAfterRender(t,d,g));const x={distanceToCameraSquared:u(g,f)};o.objects.set(f,x)}for(let _=0,y=f.children.length;_<y;_++)c(f.children[_],d,g)}function u(f,d){return Er.setFromMatrixPosition(f.matrixWorld),wr.setFromMatrixPosition(d.matrixWorld),Er.distanceToSquared(wr)}function p(f){const d=[];return f.traverseVisible(function(g){g.isCSS2DObject&&d.push(g)}),d}function m(f){const d=p(f).sort(function(_,y){if(_.renderOrder!==y.renderOrder)return y.renderOrder-_.renderOrder;const x=o.objects.get(_).distanceToCameraSquared,b=o.objects.get(y).distanceToCameraSquared;return x-b}),g=d.length;for(let _=0,y=d.length;_<y;_++)d[_].element.style.zIndex=g-_}}}const $a={CN:[35,105],IN:[22,78],US:[39,-98],ID:[-2,118],PK:[30,70],BR:[-10,-55],NG:[9,8],BD:[24,90],RU:[60,100],MX:[23,-102],JP:[36,138],ET:[9,38.5],PH:[12,122],EG:[27,30],VN:[16,108],DE:[51,10],TR:[39,35],IR:[32,53],TH:[15,101],GB:[54,-2],FR:[46,2],IT:[42.5,12.5],ZA:[-29,24],TZ:[-6,35],KE:[0,38],KR:[36,128],CO:[4,-72],ES:[40,-4],AR:[-34,-64],UG:[1,32],DZ:[28,3],UA:[49,32],IQ:[33,44],PL:[52,20],CA:[56,-106],MA:[32,-5],SA:[24,45],PE:[-10,-76],AU:[-25,134],MY:[4,109.5],GH:[8,-1],NP:[28,84],VE:[7,-66],MG:[-19,47],CM:[6,12],NL:[52.5,5.5],CL:[-34,-71],SE:[62,15],NO:[64,10],SG:[1.3,103.8],NZ:[-42,174],IE:[53,-8],IL:[31,35],AE:[24,54],CH:[47,8],AT:[47.5,14.5],PT:[39.5,-8],GR:[39,22],CZ:[49.8,15.5],BE:[50.8,4],HU:[47,20],FI:[64,26],DK:[56,10],IS:[65,-18],CD:[-3,22],SD:[16,30],AO:[-12.5,18.5],MZ:[-18,35],CI:[7.5,-5.5],NE:[17,10],BF:[12,-1.5],ML:[17,-4],SN:[14.5,-14.5],ZM:[-15,28],ZW:[-19,29.5],RW:[-2,30],AF:[33,65],MM:[21,96],KP:[40,127],MN:[46,105],LK:[7.8,80.8],KZ:[48,67],UZ:[41,64],CU:[22,-79.5],EC:[-1.5,-78.5],GT:[15.5,-90.3],BO:[-17,-65],HN:[15,-86.5],PY:[-23,-58],UY:[-33,-56],CR:[10,-84],PA:[9,-80]},Ba=new Set(["CN","IN","US","BR","RU","JP","DE","GB","FR","AU","CA","MX","ID","SA","ZA","EG","NG","AR","IT","ES","KR","TR","PL","NL","CH","SE","NO","PK","BD","VN"]),Va=new Set(["CN","IN","US","BR","RU","AU","CA"]),Ga=new Set(["RU","CA","US","CN","BR","AU"]),ja=new Set(["IN","AR","KZ","DZ","CD","SA","MX","ID","SD","LY","IR","MN","PE","TD","NE","AO","ML","ZA","CO","ET","BO","MR","EG","TZ","NG","VE","PK","TR","CL","MM"]),Ya=new Set(["AF","UA","MG","MZ","FR","ES","TH","CM","PG","JP","DE","VN","MY","CI","PL","IT","PH","EC","BF","NZ","GB","GH","RO","LA","GY","OM","BY","KH","SN","UG","NO","SE","FI","MR","ZM","ZW","NP","MA","IQ","BD"]);class Za{labelRenderer;labels=[];labelGroup;currentStyle="none";sphereRadius;currentMorph=0;globe=null;camera=null;constructor(e,t){this.sphereRadius=t,this.labelRenderer=new Na,this.labelRenderer.setSize(window.innerWidth,window.innerHeight),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.left="0",this.labelRenderer.domElement.style.pointerEvents="none",e.appendChild(this.labelRenderer.domElement),this.labelGroup=new M.Group,this.injectStyles(),this.createLabels()}injectStyles(){const e=document.createElement("style");e.textContent=`
      .country-label {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.65);
        text-shadow:
          0 0 2px rgba(0, 0, 0, 0.9),
          0 0 4px rgba(0, 0, 0, 0.5);
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        transform: translateX(-50%);
        transition: opacity 0.3s ease;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      /* Size categories - proportional to country size */
      .country-label.size-large {
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 2px;
        color: rgba(255, 255, 255, 0.7);
      }

      .country-label.size-medium {
        font-size: 7px;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.6);
      }

      .country-label.size-small {
        font-size: 6px;
        letter-spacing: 0.5px;
        color: rgba(255, 255, 255, 0.5);
      }

      .country-label.size-tiny {
        font-size: 5px;
        letter-spacing: 0.3px;
        color: rgba(255, 255, 255, 0.4);
      }

      .country-label.hidden {
        opacity: 0 !important;
        visibility: hidden;
      }

      /* Minimal style - slightly bolder for the 7 largest */
      .label-style-minimal .country-label.size-large {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 3px;
        color: rgba(255, 255, 255, 0.75);
      }

      /* Major style - balanced visibility */
      .label-style-major .country-label.size-large {
        font-size: 8px;
        letter-spacing: 2px;
      }

      .label-style-major .country-label.size-medium {
        font-size: 6px;
      }

      /* All style - keep everything subtle */
      .label-style-all .country-label {
        color: rgba(255, 255, 255, 0.5);
      }

      .label-style-all .country-label.size-large {
        font-size: 8px;
        color: rgba(255, 255, 255, 0.6);
      }

      .label-style-all .country-label.size-tiny {
        font-size: 4px;
        color: rgba(255, 255, 255, 0.35);
      }
    `,document.head.appendChild(e)}getSizeCategory(e){return Ga.has(e)?"large":ja.has(e)?"medium":Ya.has(e)?"small":"tiny"}createLabels(){$i.forEach(e=>{const t=$a[e.code];if(!t)return;const[i,n]=t,r=this.getSizeCategory(e.code),s=document.createElement("div");s.className=`country-label hidden size-${r}`,s.textContent=e.name;const o=new za(s),l={element:s,object:o,country:e,lat:i,lon:n,sizeCategory:r};this.labelGroup.add(o),this.labels.push(l),this.updateLabelPosition(o,l,this.currentMorph)})}tempVector=new M.Vector3;cameraDirection=new M.Vector3;updateLabelPosition(e,t,i){const{lat:n,lon:r,element:s}=t,o=n*Math.PI/180,l=r*Math.PI/180,h=this.sphereRadius+.5,c=h*Math.cos(o)*Math.sin(l),u=h*Math.sin(o),p=h*Math.cos(o)*Math.cos(l),m=2*Math.PI*this.sphereRadius,f=Math.PI*this.sphereRadius,d=(r+180)/360,g=(n+90)/180,_=(d-.5)*m,y=(g-.5)*f,x=.5;if(this.globe&&i>.01)if(this.tempVector.set(c,u,p),this.tempVector.applyEuler(this.globe.rotation),e.position.set(this.tempVector.x*i+_*(1-i),this.tempVector.y*i+y*(1-i),this.tempVector.z*i+x*(1-i)),this.camera&&i>.5){this.cameraDirection.copy(this.camera.position).normalize();const P=this.tempVector.clone().normalize().dot(this.cameraDirection)>-.1;s.style.opacity=P?"":"0"}else s.style.opacity="";else e.position.set(c*i+_*(1-i),u*i+y*(1-i),p*i+x*(1-i)),s.style.opacity=""}getGroup(){return this.labelGroup}setStyle(e){this.currentStyle=e,this.labels.forEach(t=>{const i=t.country.code;let n=!1;switch(e){case"none":n=!1;break;case"minimal":n=Va.has(i);break;case"major":n=Ba.has(i);break;case"all":case"capitals":n=!0;break}t.element.classList.toggle("hidden",!n)}),this.labelRenderer.domElement.className=`label-style-${e}`}setMorph(e){this.currentMorph=e}setGlobe(e){this.globe=e}setCamera(e){this.camera=e}update(){this.currentStyle!=="none"&&this.labels.forEach(e=>{this.updateLabelPosition(e.object,e,this.currentMorph)})}render(e,t){this.currentStyle!=="none"&&this.labelRenderer.render(e,t)}resize(e,t){this.labelRenderer.setSize(e,t)}getStyle(){return this.currentStyle}dispose(){this.labels.forEach(e=>{this.labelGroup.remove(e.object),e.element.remove()}),this.labels=[],this.labelRenderer.domElement.remove()}}const Xt={lifeExpectancy:{id:"lifeExpectancy",name:"Life Expectancy",unit:"years",description:"Average life expectancy at birth",colorScale:["#feedde","#fdbe85","#d94701"],domain:[55,85],format:a=>`${a.toFixed(1)} years`},humanDevIndex:{id:"humanDevIndex",name:"Human Development Index",unit:"",description:"UN composite index of life expectancy, education, and income",colorScale:["#fee5d9","#fcae91","#cb181d"],domain:[.4,1],format:a=>a.toFixed(3)},gdpPerCapita:{id:"gdpPerCapita",name:"GDP per Capita (PPP)",unit:"$",description:"Purchasing power parity adjusted GDP per person",colorScale:["#edf8e9","#74c476","#006d2c"],domain:[1e3,8e4],format:a=>`$${(a/1e3).toFixed(1)}k`},co2Emissions:{id:"co2Emissions",name:"CO₂ Emissions",unit:"t/capita",description:"Carbon dioxide emissions per capita",colorScale:["#f7fbff","#6baed6","#08306b"],domain:[0,20],format:a=>`${a.toFixed(1)}t`},renewableEnergy:{id:"renewableEnergy",name:"Renewable Energy",unit:"%",description:"Share of renewable energy in total energy consumption",colorScale:["#f7fcf5","#74c476","#00441b"],domain:[0,100],format:a=>`${a.toFixed(0)}%`},internetUsers:{id:"internetUsers",name:"Internet Penetration",unit:"%",description:"Percentage of population using the internet",colorScale:["#f2f0f7","#9e9ac8","#54278f"],domain:[0,100],format:a=>`${a.toFixed(0)}%`},urbanPopulation:{id:"urbanPopulation",name:"Urbanization",unit:"%",description:"Percentage of population living in urban areas",colorScale:["#fff5eb","#fd8d3c","#7f2704"],domain:[15,100],format:a=>`${a.toFixed(0)}%`},healthExpenditure:{id:"healthExpenditure",name:"Health Spending",unit:"% GDP",description:"Total health expenditure as percentage of GDP",colorScale:["#fff5f0","#fb6a4a","#99000d"],domain:[2,18],format:a=>`${a.toFixed(1)}%`},forestArea:{id:"forestArea",name:"Forest Coverage",unit:"%",description:"Forest area as percentage of total land area",colorScale:["#f7fcf5","#41ab5d","#00441b"],domain:[0,75],format:a=>`${a.toFixed(0)}%`},population:{id:"population",name:"Population",unit:"millions",description:"Total population",colorScale:["#fff7bc","#fec44f","#d95f0e"],domain:[1,1500],format:a=>`${a.toFixed(0)}M`},accessElectricity:{id:"accessElectricity",name:"Electricity Access",unit:"%",description:"Percentage of population with access to electricity",colorScale:["#ffeda0","#feb24c","#f03b20"],domain:[20,100],format:a=>`${a.toFixed(0)}%`},educationExpenditure:{id:"educationExpenditure",name:"Education Spending",unit:"% GDP",description:"Government expenditure on education as percentage of GDP",colorScale:["#edf8fb","#7bccc4","#0868ac"],domain:[1,10],format:a=>`${a.toFixed(1)}%`}};Xt.lifeExpectancy;const Xe=50,Xa=`
uniform float uMorph;
uniform float uTime;
uniform float uParchment;
uniform float uExtremeParchment;
uniform sampler2D uDataTexture;
uniform float uExtrudeHeight;
uniform float uDataOverlay;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vTornEdge;
varying float vCornerCurl;
varying float vCrease;
varying float vTornCorner;
varying float vDiscard;
varying float vExtrudeAmount;

const float PI = 3.14159265359;
const float RADIUS = ${Xe.toFixed(1)};

// Hash functions for procedural variation
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash3(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

// Smooth noise
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion for natural-looking tears
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vUv = uv;
    vTornEdge = 0.0;
    vCornerCurl = 0.0;
    vCrease = 0.0;
    vTornCorner = 0.0;
    vDiscard = 0.0;
    vExtrudeAmount = 0.0;

    // Sample data texture to get statistic value for height extrusion
    vec4 dataColor = texture2D(uDataTexture, uv);
    float dataLuminance = dot(dataColor.rgb, vec3(0.299, 0.587, 0.114));
    float hasData = step(0.15, dataLuminance) * uDataOverlay;
    float extrudeValue = dataLuminance * hasData * uExtrudeHeight;
    vExtrudeAmount = extrudeValue;

    // Longitude and latitude from UV
    float lon = (uv.x - 0.5) * 2.0 * PI;
    float lat = (uv.y - 0.5) * PI;

    // Spherical position with height extrusion
    float extrudedRadius = RADIUS + extrudeValue * 15.0;
    vec3 spherePos = vec3(
        extrudedRadius * cos(lat) * sin(lon),
        extrudedRadius * sin(lat),
        extrudedRadius * cos(lat) * cos(lon)
    );

    // Flat position (Mercator-like) with height extrusion
    float flatWidth = 2.0 * PI * RADIUS;
    float flatHeight = PI * RADIUS;
    vec3 flatPos = vec3(
        (uv.x - 0.5) * flatWidth,
        (uv.y - 0.5) * flatHeight,
        extrudeValue * 20.0
    );

    // Parchment curl effect - only when completely flat
    if (uMorph < 0.01 && uParchment > 0.01) {
        float edgeL = uv.x;
        float edgeR = 1.0 - uv.x;
        float edgeB = uv.y;
        float edgeT = 1.0 - uv.y;
        float minEdge = min(min(edgeL, edgeR), min(edgeB, edgeT));

        float boundaryFade = smoothstep(0.0, 0.02, edgeL) * smoothstep(0.0, 0.02, edgeR)
                           * smoothstep(0.0, 0.02, edgeB) * smoothstep(0.0, 0.02, edgeT);

        // Torn edges
        float tearNoiseL = fbm(vec2(uv.y * 15.0, 1.0)) * 0.03;
        float tearNoiseR = fbm(vec2(uv.y * 12.0, 2.0)) * 0.035;
        float tearNoiseB = fbm(vec2(uv.x * 14.0, 3.0)) * 0.025;
        float tearNoiseT = fbm(vec2(uv.x * 11.0, 4.0)) * 0.04;

        float tornL = smoothstep(tearNoiseL + 0.02, tearNoiseL, edgeL);
        float tornR = smoothstep(tearNoiseR + 0.025, tearNoiseR, edgeR);
        float tornB = smoothstep(tearNoiseB + 0.015, tearNoiseB, edgeB);
        float tornT = smoothstep(tearNoiseT + 0.03, tearNoiseT, edgeT);
        vTornEdge = max(max(tornL, tornR), max(tornB, tornT)) * uParchment;

        // Corner curls
        vec2 cornerBL = vec2(edgeL, edgeB);
        vec2 cornerBR = vec2(edgeR, edgeB);
        vec2 cornerTL = vec2(edgeL, edgeT);
        vec2 cornerTR = vec2(edgeR, edgeT);

        float distBL = length(cornerBL);
        float distBR = length(cornerBR);
        float distTL = length(cornerTL);
        float distTR = length(cornerTR);

        float curlBL = pow(1.0 - smoothstep(0.0, 0.22, distBL), 3.0) * 1.4;
        curlBL *= (0.8 + 0.4 * noise(cornerBL * 10.0));
        float curlBR = pow(1.0 - smoothstep(0.0, 0.28, distBR), 2.5) * 1.6;
        curlBR *= (0.7 + 0.5 * noise(cornerBR * 8.0));
        float curlTL = pow(1.0 - smoothstep(0.0, 0.18, distTL), 2.8) * 1.1;
        curlTL *= (0.9 + 0.3 * noise(cornerTL * 12.0));
        float curlTR = pow(1.0 - smoothstep(0.0, 0.32, distTR), 2.2) * 2.0;
        curlTR *= (0.6 + 0.6 * noise(cornerTR * 7.0));

        float totalCornerCurl = curlBL + curlBR + curlTL + curlTR;
        vCornerCurl = totalCornerCurl * uParchment;

        // Edge curls
        float curlL = pow(1.0 - smoothstep(0.02, 0.12, edgeL), 2.2);
        curlL *= (0.5 + 0.7 * noise(vec2(uv.y * 6.0, 1.0)));
        float curlR = pow(1.0 - smoothstep(0.02, 0.14, edgeR), 2.0);
        curlR *= (0.6 + 0.6 * noise(vec2(uv.y * 5.0, 2.0)));
        float curlB = pow(1.0 - smoothstep(0.02, 0.10, edgeB), 2.3);
        curlB *= (0.7 + 0.5 * noise(vec2(uv.x * 7.0, 3.0)));
        float curlT = pow(1.0 - smoothstep(0.02, 0.09, edgeT), 2.5);
        curlT *= (0.4 + 0.8 * noise(vec2(uv.x * 8.0, 4.0)));

        // Fold creases
        float crease1 = abs(uv.x + uv.y - 1.0);
        crease1 = 1.0 - smoothstep(0.0, 0.02, crease1);
        crease1 *= smoothstep(0.1, 0.3, minEdge);
        float crease2 = abs(uv.y - 0.5);
        crease2 = 1.0 - smoothstep(0.0, 0.015, crease2);
        crease2 *= smoothstep(0.05, 0.15, min(edgeL, edgeR));
        float crease3 = abs(uv.x - 0.5);
        crease3 = 1.0 - smoothstep(0.0, 0.012, crease3);
        crease3 *= smoothstep(0.05, 0.15, min(edgeB, edgeT));
        float totalCrease = (crease1 * 0.6 + crease2 * 0.4 + crease3 * 0.3);
        vCrease = totalCrease * uParchment;

        // Apply deformations
        float p = uParchment;
        float cornerZ = (curlBL * 25.0 + curlBR * 30.0 + curlTL * 20.0 + curlTR * 35.0);
        float edgeZ = (curlL + curlR + curlB + curlT) * 15.0;
        float creaseZ = totalCrease * 8.0;

        flatPos.z -= (cornerZ + edgeZ) * p * boundaryFade;
        flatPos.z += creaseZ * p * boundaryFade;

        float inwardX = (curlBR + curlTR - curlBL - curlTL) * 8.0;
        float inwardY = (curlTL + curlTR - curlBL - curlBR) * 7.0;
        flatPos.x += inwardX * p * boundaryFade;
        flatPos.y += inwardY * p * boundaryFade;

        flatPos.x += (curlR - curlL) * 5.0 * p * boundaryFade;
        flatPos.y += (curlT - curlB) * 4.0 * p * boundaryFade;

        float tornDisp = vTornEdge * 2.0;
        flatPos.z -= tornDisp * boundaryFade;

        // Surface waviness
        float interiorFade = smoothstep(0.0, 0.1, minEdge);
        float wave1 = sin(uv.x * 20.0 + uv.y * 12.0) * 0.4;
        float wave2 = sin(uv.y * 25.0 - uv.x * 8.0) * 0.3;
        float wave3 = sin((uv.x + uv.y) * 35.0) * 0.2;
        float wave4 = noise(uv * 40.0) * 0.5;
        float waves = (wave1 + wave2 + wave3 + wave4) * p * interiorFade;
        flatPos.z += waves * 0.6;

        flatPos.z += crease1 * 3.0 * p * boundaryFade;
        flatPos.z += crease2 * 2.0 * p * boundaryFade;
        flatPos.z += crease3 * 1.5 * p * boundaryFade;
    }

    // Smooth morph with easing
    float t = uMorph;
    t = t * t * (3.0 - 2.0 * t);

    vec3 pos = mix(flatPos, spherePos, t);

    // Normal calculation
    vec3 sphereNormal = normalize(spherePos);
    vec3 flatNormal = vec3(0.0, 0.0, 1.0);
    vNormal = normalize(mix(flatNormal, sphereNormal, t));

    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,Ha=`
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
uniform sampler2D uCloudTexture;
uniform sampler2D uNightTexture;
uniform float uDataOpacity;
uniform vec3 uSunDir;
uniform float uMorph;
uniform float uParchment;
uniform float uExtremeParchment;
uniform float uTime;
uniform float uTransitionEffect;

// Effect uniforms
uniform float uClouds;
uniform float uCloudSpeed;
uniform float uCloudOpacity;
uniform float uAtmosphereIntensity;
uniform float uAurora;
uniform float uAuroraIntensity;
uniform float uCityLights;
uniform float uCityLightsIntensity;
uniform float uOceanSpecular;
uniform float uSpecularIntensity;
uniform float uSunGlow;
uniform float uGridLines;
uniform float uGridOpacity;
uniform float uScanEffect;
uniform float uScanSpeed;
uniform float uHologram;
uniform vec3 uHologramColor;
uniform float uVintage;
uniform float uThermal;
uniform float uBlueprint;
uniform float uGlowPulse;
uniform vec3 uGlowColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vTornEdge;
varying float vCornerCurl;
varying float vCrease;
varying float vTornCorner;
varying float vDiscard;
varying float vExtrudeAmount;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    if (vDiscard > 0.5) {
        discard;
    }

    vec3 normal = normalize(vNormal);
    vec3 sunDir = normalize(uSunDir);

    float sunDot = dot(normal, sunDir);
    float dayFactor = smoothstep(-0.2, 0.4, sunDot);

    vec4 baseColor = texture2D(uTexture, vUv);
    vec4 dataColor = texture2D(uDataTexture, vUv);

    vec3 color = mix(baseColor.rgb, dataColor.rgb, uDataOpacity * dataColor.a);
    color *= (0.4 + 0.6 * dayFactor);

    float viewDot = max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0);
    float rim = 1.0 - viewDot;

    // Atmosphere effect
    if (uAtmosphereIntensity > 0.01) {
        float innerGlow = pow(rim, 2.0) * 0.4;
        float midGlow = pow(rim, 4.0) * 0.6;
        float outerGlow = pow(rim, 6.0) * 0.8;

        vec3 atmosphereInner = vec3(0.4, 0.7, 1.0);
        vec3 atmosphereMid = vec3(0.3, 0.5, 0.9);
        vec3 atmosphereOuter = vec3(0.5, 0.3, 0.8);

        vec3 atmosColor = atmosphereInner * innerGlow +
                          atmosphereMid * midGlow +
                          atmosphereOuter * outerGlow;

        float fresnelAtmos = pow(1.0 - viewDot, 3.0) * uMorph * uAtmosphereIntensity;
        color += atmosColor * fresnelAtmos * 0.35;

        float sunRim = max(dot(normal, sunDir), 0.0);
        float scatter = pow(rim, 2.5) * sunRim * uMorph * uAtmosphereIntensity;
        color += vec3(1.0, 0.9, 0.7) * scatter * 0.15;
    }

    // Cloud layer
    if (uClouds > 0.01) {
        vec2 cloudUv = vUv + vec2(uTime * uCloudSpeed * 0.01, 0.0);
        cloudUv = fract(cloudUv);

        float cloud1 = fbm(cloudUv * 8.0 + uTime * uCloudSpeed * 0.1);
        float cloud2 = fbm(cloudUv * 16.0 - uTime * uCloudSpeed * 0.05);
        float cloud3 = fbm(cloudUv * 4.0 + uTime * uCloudSpeed * 0.02);

        float clouds = cloud1 * 0.5 + cloud2 * 0.3 + cloud3 * 0.2;
        clouds = smoothstep(0.35, 0.7, clouds);

        vec3 cloudColor = vec3(1.0, 1.0, 1.0);
        float cloudLight = 0.7 + 0.3 * dayFactor;
        cloudColor *= cloudLight;

        color *= 1.0 - clouds * 0.15 * uClouds;
        color = mix(color, cloudColor, clouds * uCloudOpacity * uClouds);
    }

    // Grid lines
    if (uGridLines > 0.01) {
        float latLine = abs(sin(vUv.y * 3.14159 * 12.0));
        latLine = 1.0 - smoothstep(0.97, 1.0, latLine);
        float lonLine = abs(sin(vUv.x * 3.14159 * 24.0));
        lonLine = 1.0 - smoothstep(0.97, 1.0, lonLine);
        float equator = 1.0 - smoothstep(0.005, 0.01, abs(vUv.y - 0.5));
        float primeMeridian = 1.0 - smoothstep(0.003, 0.006, abs(vUv.x - 0.5));
        float gridTotal = max(max(latLine, lonLine), max(equator * 2.0, primeMeridian * 2.0));
        vec3 gridColor = vec3(0.3, 0.6, 1.0);
        color = mix(color, gridColor, gridTotal * uGridOpacity * uGridLines);
    }

    // Glow pulse
    if (uGlowPulse > 0.01) {
        float glowPulseIntensity = sin(uTime * 2.0) * 0.5 + 0.5;
        float edgePulse = pow(rim, 2.0) * glowPulseIntensity;
        color += uGlowColor * edgePulse * 0.4 * uGlowPulse * uMorph;
    }

    gl_FragColor = vec4(color, 1.0);
}
`,Wa=`
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uMorph;

const float PI = 3.14159265359;
const float RADIUS = ${Xe.toFixed(1)};

void main() {
    vNormal = normalize(normalMatrix * normal);

    float lon = (uv.x - 0.5) * 2.0 * PI;
    float lat = (uv.y - 0.5) * PI;

    float atmosRadius = RADIUS * 1.15;
    vec3 spherePos = vec3(
        atmosRadius * cos(lat) * sin(lon),
        atmosRadius * sin(lat),
        atmosRadius * cos(lat) * cos(lon)
    );

    float flatWidth = 2.0 * PI * atmosRadius;
    float flatHeight = PI * atmosRadius;
    vec3 flatPos = vec3(
        (uv.x - 0.5) * flatWidth,
        (uv.y - 0.5) * flatHeight,
        -5.0
    );

    float t = uMorph * uMorph * (3.0 - 2.0 * uMorph);
    vec3 pos = mix(flatPos, spherePos, t);

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,Ka=`
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uMorph;

void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    intensity *= uMorph;

    vec3 innerColor = vec3(0.3, 0.6, 1.0);
    vec3 outerColor = vec3(0.1, 0.2, 0.5);
    vec3 color = mix(innerColor, outerColor, intensity);

    gl_FragColor = vec4(color, intensity * 0.6);
}
`,qa=`
attribute float aSize;
attribute float aPhase;
uniform float uTime;
uniform float uTwinkle;
varying float vOpacity;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    float twinkle = sin(uTime * 2.0 + aPhase) * 0.3 + 0.7;
    twinkle = mix(1.0, twinkle, uTwinkle);
    vOpacity = twinkle;

    gl_PointSize = aSize * (300.0 / -mvPosition.z) * twinkle;
    gl_Position = projectionMatrix * mvPosition;
}
`,Qa=`
varying float vOpacity;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity * 0.9);
}
`,Pr={satellite:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",natural:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg",dark:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",light:"https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",night:"https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",topographic:"https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.topo.200407.3x5400x2700.jpg"},Cr={texture:"satellite",labels:"all",statistic:"lifeExpectancy",autoRotate:!1,initialView:"globe",showControls:!1,showLegend:!0,effects:{atmosphereIntensity:0,atmosphere:!1,clouds:!1,starTwinkle:!0},extrudeHeight:!1};class Ja{container;config;scene;camera;renderer;controls;globe=null;material=null;atmosphere=null;stars=null;gui=null;choropleth=null;legend=null;exporter=null;countryLabels=null;textureLoader=new M.TextureLoader;dataTexture=null;morph=0;currentStatistic=null;animationId=null;isDestroyed=!1;constructor(e,t={}){if(typeof e=="string"){const i=document.querySelector(e);if(!i)throw new Error(`Container not found: ${e}`);this.container=i}else this.container=e;this.config={...Cr,...t,effects:{...Cr.effects,...t.effects}},this.init()}async init(){const e=this.config.width||this.container.clientWidth||800,t=this.config.height||this.container.clientHeight||600;this.scene=new M.Scene,this.scene.background=new M.Color(2066),this.camera=new M.PerspectiveCamera(50,e/t,1,1e3),this.camera.position.set(0,0,this.config.initialView==="flat"?350:150),this.renderer=new M.WebGLRenderer({antialias:!0}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.container.appendChild(this.renderer.domElement),this.controls=new Dr(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.minDistance=80,this.controls.maxDistance=400,this.choropleth=new xa,this.config.showLegend&&(this.legend=new ba),await this.createGlobe(),this.createStars(),this.config.effects.atmosphere&&this.createAtmosphere(),this.countryLabels=new Za(this.container,Xe),this.scene.add(this.countryLabels.getGroup()),this.globe&&this.countryLabels.setGlobe(this.globe),this.countryLabels.setCamera(this.camera),this.countryLabels.setStyle(this.config.labels),this.exporter=new Fa(this.renderer,this.scene,this.camera),this.config.showControls&&this.createGUI(),await this.choropleth.waitForLoad(),this.setStatistic(this.config.statistic),this.morph=this.config.initialView==="globe"?1:0,this.material&&(this.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),window.addEventListener("resize",this.handleResize),window.addEventListener("keydown",this.handleKeydown),this.animate()}async createGlobe(){const e=await this.textureLoader.loadAsync(Pr[this.config.texture]);e.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),e.minFilter=M.LinearMipmapLinearFilter,e.magFilter=M.LinearFilter;const t=document.createElement("canvas");t.width=2048,t.height=1024,this.dataTexture=new M.CanvasTexture(t);const i=new M.PlaneGeometry(Math.PI*2*Xe,Math.PI*Xe,256,128);this.material=new M.ShaderMaterial({vertexShader:Xa,fragmentShader:Ha,uniforms:{uMorph:{value:0},uTime:{value:0},uParchment:{value:0},uExtremeParchment:{value:0},uTransitionEffect:{value:0},uTexture:{value:e},uDataTexture:{value:this.dataTexture},uCloudTexture:{value:null},uNightTexture:{value:null},uDataOpacity:{value:0},uDataOverlay:{value:0},uExtrudeHeight:{value:this.config.extrudeHeight?1:0},uSunDir:{value:new M.Vector3(1,.5,1).normalize()},uClouds:{value:this.config.effects.clouds?1:0},uCloudSpeed:{value:this.config.effects.cloudSpeed||1},uCloudOpacity:{value:this.config.effects.cloudOpacity||.6},uAtmosphereIntensity:{value:this.config.effects.atmosphereIntensity||0},uAurora:{value:this.config.effects.aurora?1:0},uAuroraIntensity:{value:1},uCityLights:{value:this.config.effects.cityLights?1:0},uCityLightsIntensity:{value:1},uOceanSpecular:{value:this.config.effects.oceanSpecular?1:0},uSpecularIntensity:{value:1},uSunGlow:{value:0},uGridLines:{value:this.config.effects.gridLines?1:0},uGridOpacity:{value:this.config.effects.gridOpacity||.5},uScanEffect:{value:0},uScanSpeed:{value:1},uHologram:{value:this.config.effects.hologramMode?1:0},uHologramColor:{value:new M.Color(65535)},uVintage:{value:this.config.effects.vintageMode?1:0},uThermal:{value:this.config.effects.thermalMode?1:0},uBlueprint:{value:this.config.effects.blueprintMode?1:0},uGlowPulse:{value:this.config.effects.glowPulse?1:0},uGlowColor:{value:new M.Color(4491519)}},side:M.DoubleSide}),this.globe=new M.Mesh(i,this.material),this.scene.add(this.globe)}createAtmosphere(){const e=new M.PlaneGeometry(Math.PI*2*Xe*1.15,Math.PI*Xe*1.15,128,64),t=new M.ShaderMaterial({vertexShader:Wa,fragmentShader:Ka,uniforms:{uMorph:{value:0}},side:M.BackSide,transparent:!0,blending:M.AdditiveBlending,depthWrite:!1});this.atmosphere=new M.Mesh(e,t),this.scene.add(this.atmosphere)}createStars(){const t=new M.BufferGeometry,i=new Float32Array(3e3*3),n=new Float32Array(3e3),r=new Float32Array(3e3);for(let o=0;o<3e3;o++){const l=300+Math.random()*300,h=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1);i[o*3]=l*Math.sin(c)*Math.cos(h),i[o*3+1]=l*Math.sin(c)*Math.sin(h),i[o*3+2]=l*Math.cos(c),n[o]=.5+Math.random()*1.5,r[o]=Math.random()*Math.PI*2}t.setAttribute("position",new M.BufferAttribute(i,3)),t.setAttribute("aSize",new M.BufferAttribute(n,1)),t.setAttribute("aPhase",new M.BufferAttribute(r,1));const s=new M.ShaderMaterial({vertexShader:qa,fragmentShader:Qa,uniforms:{uTime:{value:0},uTwinkle:{value:this.config.effects.starTwinkle?1:0}},transparent:!0,blending:M.AdditiveBlending,depthWrite:!1});this.stars=new M.Points(t,s),this.scene.add(this.stars)}createGUI(){this.gui=new Ni({title:"Globe Controls",width:300});const e=this.gui.addFolder("View");e.add({toGlobe:()=>this.toGlobe()},"toGlobe").name("→ Globe"),e.add({toFlat:()=>this.toFlat()},"toFlat").name("→ Flat Map"),e.add({morph:this.morph},"morph",0,1).name("Morph").onChange(r=>this.setMorph(r)),e.open();const t=this.gui.addFolder("Statistics"),i=Object.keys(Xt);t.add({stat:this.config.statistic},"stat",i).name("Statistic").onChange(r=>this.setStatistic(r)),t.open();const n=["none","minimal","major","all"];this.gui.add({labels:this.config.labels},"labels",n).name("Labels").onChange(r=>this.setLabels(r)),this.gui.add(this.config,"autoRotate").name("Auto Rotate")}handleResize=()=>{if(this.isDestroyed)return;const e=this.config.width||this.container.clientWidth,t=this.config.height||this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.countryLabels?.resize(e,t)};handleKeydown=e=>{this.isDestroyed||(e.key==="g"||e.key==="G")&&(this.morph>.5?this.toFlat():this.toGlobe())};animate=()=>{if(this.isDestroyed)return;this.animationId=requestAnimationFrame(this.animate);const e=performance.now()*.001;this.material&&(this.material.uniforms.uTime.value=e),this.stars&&(this.stars.material.uniforms.uTime.value=e),this.controls.update(),this.config.autoRotate&&this.globe&&(this.globe.rotation.y+=.002*this.morph),this.countryLabels?.update(),this.renderer.render(this.scene,this.camera),this.countryLabels?.render(this.scene,this.camera)};toGlobe(){wt.to(this,{morph:1,duration:2.5,ease:"power2.inOut",onUpdate:()=>{this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.config.onViewChange?.("globe",this.morph)}}),wt.to(this.camera.position,{z:150,duration:2.5,ease:"power2.inOut"})}toFlat(){wt.to(this,{morph:0,duration:2.5,ease:"power2.inOut",onUpdate:()=>{this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph),this.config.onViewChange?.("flat",this.morph)}}),wt.to(this.camera.position,{z:350,duration:2.5,ease:"power2.inOut"})}setMorph(e){this.morph=Math.max(0,Math.min(1,e)),this.material&&(this.material.uniforms.uMorph.value=this.morph),this.atmosphere&&(this.atmosphere.material.uniforms.uMorph.value=this.morph),this.countryLabels?.setMorph(this.morph)}getMorph(){return this.morph}setStatistic(e){if(typeof e=="string"){if(!Xt[e]){console.warn(`Unknown statistic: ${e}`);return}this.currentStatistic=e;const i=_a.find(n=>n.id===e);if(i&&this.choropleth){const n=this.choropleth.renderTexture(i);if(this.material&&n){const r=new M.CanvasTexture(n);r.needsUpdate=!0,this.material.uniforms.uDataTexture.value=r,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value=.7}}this.legend&&i&&this.legend.show(i)}else{const t=e;if(this.currentStatistic=t.definition.id,this.choropleth){const i=this.choropleth.renderCustomTexture(t.values,t.definition.colorScale,t.definition.domain);if(this.material&&i){const n=new M.CanvasTexture(i);n.needsUpdate=!0,this.material.uniforms.uDataTexture.value=n,this.material.uniforms.uDataOverlay.value=1,this.material.uniforms.uDataOpacity.value=.7}}this.legend&&this.legend.show(t.definition)}}setLabels(e){this.countryLabels?.setStyle(e)}async setTexture(e){const t=Pr[e];if(!(!t||!this.material))try{const i=await this.textureLoader.loadAsync(t);i.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),i.minFilter=M.LinearMipmapLinearFilter,i.magFilter=M.LinearFilter,this.material.uniforms.uTexture.value=i}catch(i){console.error("Failed to load texture:",e,i)}}setAutoRotate(e){this.config.autoRotate=e}screenshot(e){this.exporter?.screenshot(e)}async recordGif(e){if(!this.exporter)return;const t=e?.duration||5,i=e?.fps||20,n=t*i;this.exporter.startGifCapture(e);for(let r=0;r<n;r++)this.exporter.captureGifFrame(),await new Promise(s=>setTimeout(s,1e3/i));await this.exporter.stopGifCapture(e)}async recordVideo(e){if(!this.exporter)return;const t=e?.duration||5;await this.exporter.startVideoRecording(e),await new Promise(i=>setTimeout(i,t*1e3)),this.exporter.stopVideoRecording()}setEffects(e){Object.assign(this.config.effects,e),this.material&&(e.atmosphere!==void 0&&(e.atmosphere&&!this.atmosphere?this.createAtmosphere():!e.atmosphere&&this.atmosphere&&(this.scene.remove(this.atmosphere),this.atmosphere.geometry.dispose(),this.atmosphere.material.dispose(),this.atmosphere=null)),e.clouds!==void 0&&(this.material.uniforms.uClouds.value=e.clouds?1:0),e.cloudSpeed!==void 0&&(this.material.uniforms.uCloudSpeed.value=e.cloudSpeed),e.cloudOpacity!==void 0&&(this.material.uniforms.uCloudOpacity.value=e.cloudOpacity),e.atmosphereIntensity!==void 0&&(this.material.uniforms.uAtmosphereIntensity.value=e.atmosphereIntensity),e.gridLines!==void 0&&(this.material.uniforms.uGridLines.value=e.gridLines?1:0),e.gridOpacity!==void 0&&(this.material.uniforms.uGridOpacity.value=e.gridOpacity),e.glowPulse!==void 0&&(this.material.uniforms.uGlowPulse.value=e.glowPulse?1:0),e.starTwinkle!==void 0&&this.stars&&(this.stars.material.uniforms.uTwinkle.value=e.starTwinkle?1:0))}resize(e,t){this.config.width=e,this.config.height=t,this.handleResize()}destroy(){this.isDestroyed=!0,this.animationId&&cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.handleResize),window.removeEventListener("keydown",this.handleKeydown),this.gui?.destroy(),this.legend?.dispose(),this.countryLabels?.dispose(),this.globe?.geometry.dispose(),this.globe?.material?.dispose(),this.atmosphere?.geometry.dispose(),this.atmosphere?.material?.dispose(),this.stars?.geometry.dispose(),this.stars?.material?.dispose(),this.renderer.dispose(),this.container.removeChild(this.renderer.domElement)}}ve.BUILT_IN_STATISTICS=Xt,ve.GlobeViz=Ja,ve.WORLD_STATISTICS=$i,Object.defineProperty(ve,Symbol.toStringTag,{value:"Module"})}));
//# sourceMappingURL=gralobe.umd.cjs.map
