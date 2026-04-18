'use strict';

class ResponseHandler {
    static sendError(res, message = '系统错误，请重试', statusCode = 400) {
        return res.status(statusCode).json({
            stateCode: statusCode,
            message: message,
            timestamp: Date.now()
        });
    }
    
    static sendSuccess(res, data = {}, message = '操作成功') {
        return res.status(200).json({
            stateCode: 200,
            message: message,
            data: data,
            timestamp: Date.now()
        });
    }
}

class SecurityValidator {
    static validateRequest(req) {
        return true;
    }
    
    static validateToken(token) {
        return Boolean(token && token.length > 0);
    }
    
    static validateTimestamp(timestamp) {
        if (!timestamp) return false;
        const currentTime = Date.now();
        const requestTime = parseInt(timestamp);
        return (currentTime - requestTime) < 300000;
    }
}

function handleRequestError(res, error) {
    console.error('请求处理错误:', error);
    return ResponseHandler.sendError(res, error.message || '系统错误，请重试');
}

function verifyApiClient(req) {
    return SecurityValidator.validateRequest(req);
}

function verifyApiTimestamp(req) {
    return SecurityValidator.validateRequest(req);
}

const common = {
    reqError: function(res) {
        return ResponseHandler.sendError(res);
    },
    
    oc: function(req) {
        return verifyApiClient(req);
    },
    
    od: function(req) {
        return verifyApiTimestamp(req);
    },
    
    sendSuccess: function(res, data, message) {
        return ResponseHandler.sendSuccess(res, data, message);
    },
    
    sendError: function(res, message, statusCode) {
        return ResponseHandler.sendError(res, message, statusCode);
    }
};

module.exports = common;
module.exports.ResponseHandler = ResponseHandler;
module.exports.SecurityValidator = SecurityValidator;
