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

/**
 * Creates new player for video and ad playback.
 *
 */
let Player = function() {
  this.context_ = cast.framework.CastReceiverContext.getInstance();
  // this.context_.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

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

  this.playerManager_.setMediaUrlResolver((requestData) => {
    console.log("onMediaUrlResolver - " + requestData.media.contentId);
    // console.log(requestData);

    // if (this.request_ && this.request_.customData["rmcKey"] && (requestData.media.contentId.endsWith(".m3u8") || requestData.media..endsWith(".ts"))) {
    //   return requestData.media.contentId + "?" +this.request_.customData.rmcKeyParamName+ "=" + this.request_.customData["rmcKey"]; contentId
    // }

    return requestData.media.contentId;
  }); 

  this.playerManager_.setMediaPlaybackInfoHandler((requestData, config) => {
    console.log("onMediaPlaybackInfoHandler");
    // console.log(requestData);
    // console.log(config);

    return config;
  }); 

  
  this.playerManager_.setPlaybackConfig(playbackConfig);
  const options = new cast.framework.CastReceiverOptions();
  // Map of namespace names to their types.
  options.customNamespaces = {};
  this.context_.start(options);

  this.setupCallbacks_();
};

/**
 * Attaches necessary callbacks.
 * @private
 */
Player.prototype.setupCallbacks_ = function() {
  let self = this;

  // Initializes IMA SDK when Media Manager is loaded.
  this.playerManager_.setMessageInterceptor(
      cast.framework.messages.MessageType.LOAD,
      (request) => {
        if (request.customData.adTags) {
          var vmapAdsRequest = new cast.framework.messages.VastAdsRequest();
          vmapAdsRequest.adTagUrl = request.customData.adTags;
          request.vmapAdsRequest = vmapAdsRequest;
        }
        this.request_ = request;        
        return request;
      });

  this.playerManager_.addEventListener(
        cast.framework.events.EventType.MEDIA_STATUS, (event) => {
          console.log("MEDIA_STATUS - " + event.mediaStatus.playerState + ", " + event.mediaStatus.idleReason);
          console.log(event);
    });

  this.playerManager_.addEventListener(
      cast.framework.events.EventType.PLAYER_LOAD_COMPLETE, () => {
        console.log("PLAYER_LOAD_COMPLETE");

        if (this.request_.customData.adTags && !this.request_.autoplay) {
          self.requestAd_(this.request_.customData.adTags, 0);
        }    
      });

  this.playerManager_.addEventListener(
      cast.framework.events.EventType.ERROR, (event) => {
        console.log("ERROR - " + event.detailedErrorCode);
        console.log(event);
  }); 
};

/**
 * Sends messages to all connected sender apps.
 * @param {string} message Message to be sent to senders.
 * @private
 */
Player.prototype.broadcast_ = function(message) {
  this.context_.sendCustomMessage(NAMESPACE, undefined, message);
};
