//
//  AppDelegate.swift
//  area
//
//  Created by Paul Erny on 09/02/2021.
//

//import Firebase
import GoogleSignIn
import FBSDKLoginKit
import UIKit

class FacebookDelegate: NSObject, LoginButtonDelegate, ObservableObject {

    @Published var isLogged: Bool = AccessToken.current != nil ? true : false

    func loginButton(_ loginButton: FBLoginButton, didCompleteWith result: LoginManagerLoginResult?, error: Error?) {
        if error != nil {
            print((error?.localizedDescription)!)
            return
        }

        if AccessToken.current != nil {
//            let credential = FacebookAuthProvider.credential(withAccessToken: AccessToken.current!.tokenString)
//            Auth.auth().signIn(with: credential) { (res, err) in
                
//                if err != nil {
//                    print((err?.localizedDescription)!)
//                    return
//                }
//                print("email: \(String(describing: res?.user.email))")
//                print("name: \(String(describing: res?.user.displayName))")

                // sucessfuly connected
//                DispatchQueue.main.async {
                self.isLogged = true
//                    self.session.value = true
//                }
//                    self.isLogged.value = true
//            }
        }
    }
    
    func loginButtonDidLogOut(_ loginButton: FBLoginButton) {
        DispatchQueue.main.async {
            self.isLogged = false
//            self.session.value = false
        }
//        try! Auth.auth().signOut()
    }
}

class GoogleDelegate: NSObject, GIDSignInDelegate, ObservableObject {
    
    @Published var isSignedIn: Bool = false
    @Published var user: GIDGoogleUser? = nil
    @Published var accessToken: String = ""
    
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error?) {
        
        if let error = error {
            if (error as NSError).code == GIDSignInErrorCode.hasNoAuthInKeychain.rawValue {
                print("The user has not signed in before or they have since signed out.")
            } else {
                print("\(error.localizedDescription)")
            }
            return
        }
        self.isSignedIn = true
        self.accessToken = user.authentication.accessToken
        self.user = user
        
        // ...
//        if let error = error {
//            print(error)
//            return
//        }
//
//        guard let authentication = user.authentication else { return }
//        let credential = GoogleAuthProvider.credential(withIDToken: authentication.idToken,
//                                                            accessToken: authentication.accessToken)
//
//        // Loggin to firebase
//        Auth.auth().signIn(with: credential) { (authResult, error) in
//            if error != nil {
//                print((error?.localizedDescription)!)
//                return
//            }
//
//            // User Logged In Successfully...
//
//            // Sending Notification To UI...
//
//            NotificationCenter.default.post(name: NSNotification.Name("SIGNIN"), object: nil)
//            self.isSignedIn = true
//            self.user = authResult?.user
//            // Printing Email ID
//            print(" from delegate \(String(describing: authResult?.user.email))")
////            print(authResult?.user.email )
//
//            if (GIDSignIn.sharedInstance().currentUser != nil) {
//                GIDSignIn.sharedInstance()?.scopes.append("https://www.googleapis.com/auth/youtube")
//                GIDSignIn.sharedInstance()?.scopes.append("https://www.googleapis.com/auth/youtube.force-ssl")
//                self.accessToken = GIDSignIn.sharedInstance().currentUser.authentication.accessToken
//                print(" token \(self.accessToken)")
////                print(self.accessToken)
////                     Use accessToken in your URL Requests Header
//            }
//        }
    }
}


@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    let googleDelegate = GoogleDelegate()
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        ApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions)
        
//        FirebaseApp.configure()
//        ApplicationDelegate.initializeSDK(nil)

        GIDSignIn.sharedInstance().clientID = "643605959592-bf727qje9c0j70herqenskhg1no1a2i0.apps.googleusercontent.com"
        GIDSignIn.sharedInstance().delegate = googleDelegate
        
        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any]) -> Bool {
//        let handled: Bool = ApplicationDelegate.shared.application(app, open: url, sourceApplication: options[.sourceApplication] as? String, annotation: options[.annotation])
        return GIDSignIn.sharedInstance().handle(url)
//        return handled
    }
    
    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }

}

