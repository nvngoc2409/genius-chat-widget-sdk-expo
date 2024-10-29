package expo.modules.dgchat

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.widget.FrameLayout
import com.digitalgenius.chatwidgetsdk.R
import com.digitalgenius.chatwidgetsdk.ui.DGChatView
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class DGChatActivityLifecycleListener : ReactActivityLifecycleListener {
    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
        val rootLayout: FrameLayout = activity.findViewById(android.R.id.content)
        val dgChatView = DGChatView(activity, null)
        dgChatView.layoutParams = FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT,
        )
        dgChatView.id = R.id.chat_view
        rootLayout.addView(dgChatView)
        rootLayout.setOnTouchListener { _, motionEvent ->
            !dgChatView.onInterceptTouchEvent(motionEvent)
        }
    }
}