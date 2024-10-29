package expo.modules.dgchat

import expo.modules.kotlin.jni.JavaScriptObject
import expo.modules.kotlin.jni.JavaScriptValue

internal fun JavaScriptObject.toMap(): Map<String, Any> {
    val result = mutableMapOf<String, Any>()
    getPropertyNames().forEach {
        val value = getProperty(it)
        if (value.isObject()) {
            result[it] = value.getObject().toMap()
        } else if (value.isArray()) {
            result[it] = value.getArray().toList()
        } else if (value.isBool()) {
            result[it] = value.getBool()
        } else if (value.isNumber()) {
            try {
                result[it] = value.getLong()
            } catch (e: Throwable) {
                result[it] = value.getDouble()
            }
        } else if (value.isSymbol() || value.isString()) {
            result[it] = value.getString()
        }
    }
    return result
}

internal fun Array<JavaScriptValue>.toList(): List<Any> {
    val result = mutableListOf<Any>()
    forEach {
        if (it.isObject()) {
            result.add(it.getObject().toMap())
        } else if (it.isArray()) {
            result.add(it.getArray().toList())
        } else if (it.isBool()) {
            result.add(it.getBool())
        } else if (it.isNumber()) {
            try {
                result.add(it.getLong())
            } catch (e: Throwable) {
                result.add(it.getDouble())
            }
        } else if (it.isSymbol() || it.isString()) {
            result.add(it.getString())
        }
    }
    return result
}