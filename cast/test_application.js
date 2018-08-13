/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

let TestApplication = function() {
  this.context_ = cast.framework.CastReceiverContext.getInstance();
  this.context_.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

  this.playerManager_ = this.context_.getPlayerManager();
  this.mediaElement_ = document.getElementById('player').getMediaElement();

  var playbackConfig = new cast.framework.PlaybackConfig();
  playbackConfig.segmentRequestHandler = (networkRequestInfo) => {
    if (this.request_ && this.request_.customData["rmcKey"] && networkRequestInfo.url.endsWith(".ts")) {
      networkRequestInfo.url += "?" +this.request_.customData.rmcKeyParamName + "=" + this.request_.customData["rmcKey"]; 
    }
  };
  
  playbackConfig.manifestRequestHandler = requestInfo => {
    console.log("onManifestRequestHandler");
    // console.log(requestInfo);
    if (this.request_ && this.request_.customData["rmcKey"] && (requestInfo.url.endsWith(".m3u8"))) {
      requestInfo.url += "?" +this.request_.customData.rmcKeyParamName+ "=" + this.request_.customData["rmcKey"]; 
    }
  };
  
  this.playerManager_.setPlaybackConfig(playbackConfig);
  this.context_.start();

  this.playerManager_.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    (request) => {
      if (request.customData.adTags) {
        var vmapAdsRequest = new cast.framework.messages.VastAdsRequest();
        vmapAdsRequest.adTagUrl = request.customData.adTags;
        request.media.vmapAdsRequest = vmapAdsRequest;
      }
      this.request_ = request;
      return request;
    });
};  