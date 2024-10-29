import ExpoModulesCore
import DGChatSDK
import SafariServices

public class DGChatModule: Module, DGChatDelegate {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('DGChatModule')` in JavaScript.
        Name("DGChatModule")
        
        // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
        Constants([
            "PI": Double.pi
        ])
        
        // Defines event names that the module can send to JavaScript.
        Events(
            "onChatLauncherClick",
            "onChatMinimizeClick",
            "onCSATPopoverCloseClicked",
            "onChatProactiveButtonClick",
            "onWidgetEmbedded",
            "newConversationStarted",
            "onChatInitialised",
            "onChatInitialisedError"
        )
        
        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        Function("showDGChatView") {
            (widgetId: String, env: String,
             customConfigs: JavaScriptObject?,
             crmPlatform: String?,
             crmVersion: String?) in
            return showDGChatView(widgetId: widgetId, env: env, customConfigs: customConfigs, crmPlatform: crmPlatform, crmVersion:crmVersion)
        }
        Function("initProactiveButtons") { (questions: Array<JavaScriptValue>, answers: Array<JavaScriptValue>) in
            initProactiveButtons(questions: questions, answers: answers)
        }
        Function("sendMessage") { (message: String) in
            sendMessage(message: message)
        }
        Function("sendSystemMessage") { (payload: JavaScriptObject) in
            sendSystemMessage(payload: payload)
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
    
    // MARK: - Private properties
    private var topVC: UIViewController?
    private var widgetIdProvided: String?
    private var flowURLProvided: String?
    private var envProvided: String?
    private var configsProvided: [String: Any]? = nil
    private var platform: String? = nil
    private var version: String? = nil
    
    
    
    private func showDGChatView(widgetId: String, env: String, customConfigs: JavaScriptObject?, crmPlatform: String?, crmVersion: String?) {
        widgetIdProvided = widgetId
        envProvided = env
        configsProvided = convertJavaScriptObjectToDictionary(jsObject: customConfigs)
        platform = crmPlatform
        version = crmVersion
        DispatchQueue.main.async {
            DGChat.delegate = self
            self.addWidget()
        }
    }
    
    private func initProactiveButtons(questions: Array<JavaScriptValue>, answers: Array<JavaScriptValue>){
        let list1 = questions.compactMap({ convertJavaScriptValueToSwiftValue(jsValue: $0) as? String })
        let list2 = answers.compactMap({ convertJavaScriptValueToSwiftValue(jsValue: $0) as? String })
        initChatProactiveButtons(list1, list2)
    }
    
    private func sendMessage(message: String){
        sendWidgetMessage(message)
    }
    
    private func sendSystemMessage(payload: JavaScriptObject){
        let dict = convertJavaScriptObjectToDictionary(jsObject: payload)
        sendWidgetSystemMessage(dict)
    }
    
    private func launchWidget(){
        showWidget()
    }
    
    private func hideDGChatView(){
        minimizeWidget()
    }
    
    private func resetChat(){
        resetDGChat()
    }
}

// MARK: - Private methods
extension DGChatModule {
    private func open(vc: SFSafariViewController) {
        DispatchQueue.main.async {
            let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
            
            if var topController = keyWindow?.rootViewController {
                while let presentedViewController = topController.presentedViewController {
                    topController = presentedViewController
                }
                self.topVC = topController
                topController.present(vc, animated: true)
            }
        }
    }
    
    func convertJavaScriptObjectToDictionary(jsObject: JavaScriptObject?) -> [String: Any] {
        guard let jsObject else { return [:] }
        var result = [String: Any]()
        
        // Retrieve the property names from the JavaScriptObject
        let propertyNames = jsObject.getPropertyNames()
        
        // Iterate through each property name
        for key in propertyNames {
            // Use `get` method to retrieve the value for each key
            if let value = self.convertJavaScriptValueToSwiftValue(jsValue: jsObject.getProperty(key)) {
                result[key] = value
            }
        }
        
        return result
    }
    
    func convertJavaScriptValueToSwiftValue(jsValue: JavaScriptValue) -> Any? {
        // Check if the JavaScriptValue is null
        if jsValue.isNull() {
            return nil
        }
        // Convert based on the type of JavaScriptValue
        if jsValue.isBool() {
            return jsValue.getBool()
        } else if jsValue.isNumber() {
            return jsValue.getDouble()
        } else if jsValue.isString() {
            return jsValue.getString()
        } else {
            // Handle unsupported types if necessary
            print("Unsupported JavaScript value type.")
            return nil
        }
    }
    
}

// MARK: - DGChatDelegate
extension DGChatModule {
    
    public var configs: [String: Any]? {
        return configsProvided
    }
    
    public var widgetId: String {
        if let id = widgetIdProvided {
            return id
        } else {
            return "your API Key"
        }
    }
    
    public var env: String {
        if let environment = envProvided {
            return environment
        } else {
            return ""
        }
    }
    
    public var crmCredentials: DGChatCRMCredentials? {
        if let platform = platform, let version = version {
            return DGChatCRMCredentials(platform: platform, version: version)
        }
        return nil
    }
    
    public func didTrack(action: DGChatSDK.DGChatAction) {
        switch action {
        case .onChatMinimizeClick:
            sendEvent("onChatMinimizeClick")
        case .onChatLauncherClick:
            sendEvent("onChatLauncherClick")
        case .onChatProactiveButtonClick:
            sendEvent("onChatProactiveButtonClick")
        case .onCSATPopoverCloseClicked:
            sendEvent("onCSATPopoverCloseClicked")
        case .onWidgetEmbedded:
            sendEvent("onWidgetEmbedded")
        case .onChatInitialised:
            sendEvent("onChatInitialised")
        case .onChatInitialisedError:
            sendEvent("onChatInitialisedError")
        case .newConversationStarted:
            sendEvent("newConversationStarted")
        default:
            break
        }
    }
    
    public func didAttemptToOpen(url: URL) {
        let safari = SFSafariViewController(url: url)
        open(vc: safari)
    }
    
    public func didFailWith(error: Error) {
        print("😱 \(#function): \(error)")
    }
}

//MARK: - Chat methods
extension DGChatModule {
    
    private func addWidget() {
        DispatchQueue.main.async {
            let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
            
            if var topController = keyWindow?.rootViewController {
                while let presentedViewController = topController.presentedViewController {
                    topController = presentedViewController
                }
                DGChat.added(to: topController) {_ in
                    debugPrint("did add Widget to \(topController.debugDescription)")
                }
            }
        }
    }
    
    private func removeWidget() {
        DispatchQueue.main.async {
            guard DGChat.isPresented else { return }
            DGChat.hide(animated: true) {
            }
        }
    }
    
    private func sendWidgetMessage(_ message: String) {
        DispatchQueue.main.async {
            guard DGChat.isPresented else { return }
            DGChat.sendMessage(message) { _ in
            }
        }
    }
    
    private func sendWidgetSystemMessage(_ message: [String: Any]) {
        DispatchQueue.main.async {
            guard DGChat.isPresented else { return }
            DGChat.sendSystemMessage(message) { _ in
            }
        }
    }
    
    private func showWidget() {
        DispatchQueue.main.async {
            guard DGChat.isPresented else { return }
            DGChat.expandWidget { _ in
            }
        }
    }
    
    private func minimizeWidget() {
        DispatchQueue.main.async {
            guard DGChat.isPresented else { return }
            DGChat.minimizeWidget { _ in
            }
        }
    }
    
    private func resetDGChat() {
        DispatchQueue.main.async {
            guard DGChat.isPresented else { return }
            DGChat.resetChat { _ in
            }
        }
    }
    
    private func initChatProactiveButtons(_ questions: [String], _ answers: [String]) {
        DispatchQueue.main.async {
            guard DGChat.isPresented else { return }
            DGChat.initProactiveButtons(questions: questions, answers: answers) { _ in
            }
        }
    }
}
