package expo.modules.dgchat

import com.digitalgenius.chatwidgetsdk.DGChatSdk
import com.digitalgenius.chatwidgetsdk.R
import com.digitalgenius.chatwidgetsdk.interactions.DGChatMethods
import com.digitalgenius.chatwidgetsdk.interactions.IDGChatWidgetListener
import com.digitalgenius.chatwidgetsdk.ui.DGChatView
import expo.modules.kotlin.jni.JavaScriptObject
import expo.modules.kotlin.jni.JavaScriptValue
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DGChatModule : Module() {
    private var methods: DGChatMethods? = null

    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    override fun definition() = ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('DGChatModule')` in JavaScript.
        Name("DGChatModule")

        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants(
            "PI" to Math.PI
        )

        // Defines event names that the module can send to JavaScript.
        Events(
            "onChatLauncherClick",
            "onChatMinimizeClick",
            "onCSATPopoverCloseClicked",
            "onChatProactiveButtonClick",
            "onWidgetEmbedded",
            "newConversationStarted",
            "onChatInitialised",
            "onChatInitialisedError",
            "onChatEndClick",
        )

        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("showDGChatView") {
                widgetId: String, env: String,
                customConfigs: JavaScriptObject?,
                crmPlatform: String?,
                crmVersion: String?,
            ->
            showDGChatView(widgetId, env, customConfigs, crmPlatform, crmVersion)
        }
        Function("initProactiveButtons") { questions: Array<JavaScriptValue>, answers: Array<JavaScriptValue> ->
            initProactiveButtons(questions, answers)
        }
        Function("sendMessage") { message: String ->
            sendMessage(message)
        }
        Function("sendSystemMessage") { payload: JavaScriptObject ->
            sendSystemMessage(payload)
        }
        Function("launchWidget") {
            launchWidget()
        }
        Function("hideDGChatView") {
            hideDGChatView()
        }
        Function("resetChat") {
            resetChat()
        }
    }

    private fun getChatView() =
        appContext.currentActivity?.findViewById<DGChatView>(R.id.chat_view)

    private fun DGChatView.init() {
        chatWidgetListener = object : IDGChatWidgetListener {
            override fun newConversationStarted() {
                sendEvent("newConversationStarted")
            }

            override fun onCSATPopoverCloseClicked() {
                sendEvent("onCSATPopoverCloseClicked")
            }

            override fun onChatEndClick() {
                sendEvent("onChatEndClick")
            }

            override fun onChatInitialised() {
                sendEvent("onChatInitialised")
            }

            override fun onChatInitialisedError() {
                sendEvent("onChatInitialisedError")
            }

            override fun onChatLauncherClick() {
                sendEvent("onChatLauncherClick")
            }

            override fun onChatMinimizeClick() {
                sendEvent("onChatMinimizeClick")
            }

            override fun onChatProactiveButtonClick() {
                sendEvent("onChatProactiveButtonClick")
            }

            override fun onWidgetEmbedded() {
                sendEvent("onWidgetEmbedded")
            }

        }
    }

    private fun showDGChatView(
        widgetId: String,
        env: String,
        customConfigs: JavaScriptObject? = null,
        crmPlatform: String? = null,
        crmVersion: String? = null,
    ) {
        DGChatSdk.init(
            widgetId = widgetId, env = env,
            configs = customConfigs?.toMap() ?: mapOf(),
            crmPlatform = crmPlatform,
            crmVersion = crmVersion,
        )
        appContext.currentActivity?.runOnUiThread {
            getChatView()?.init()
            methods = getChatView()?.show()
        }
    }

    private fun initProactiveButtons(
        questions: Array<JavaScriptValue>,
        answers: Array<JavaScriptValue>
    ) {
        appContext.currentActivity?.runOnUiThread {
            methods?.initProactiveButtons(
                questions.map { it.getString() },
                answers.map { it.getString() },
            )
        }
    }

    private fun sendMessage(message: String) {
        appContext.currentActivity?.runOnUiThread { methods?.sendMessage(message) }
    }

    private fun sendSystemMessage(payload: JavaScriptObject) {
        appContext.currentActivity?.runOnUiThread { methods?.sendSystemMessage(payload.toMap()) }
    }

    private fun launchWidget() {
        appContext.currentActivity?.runOnUiThread { methods?.launchWidget() }
    }

    private fun hideDGChatView() {
        appContext.currentActivity?.runOnUiThread {
            getChatView()?.hide()
        }
    }

    private fun resetChat() {
        appContext.currentActivity?.runOnUiThread {
            DGChatSdk.resetChat(appContext.currentActivity!!)
        }
    }
}
