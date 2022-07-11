//
//  githubView.swift
//  area
//
//  Created by Paul Erny on 08/03/2021.
//

import SwiftUI
import WebKit
import SafariServices

struct WebView : UIViewRepresentable {

    func makeUIView(context: Context) -> WKWebView  {
        return WKWebView()
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        let authURL = URL(string: String("https://github.com/login/oauth/authorize?client_id=919dcc45602ba0b18b15"))
        var urlRequest = URLRequest(url: authURL!)

        let cookieURL = URL(string: String("https://www.whispr-area.tech/api/auth/login"))
        if let cookies = HTTPCookieStorage.shared.cookies(for: cookieURL!) {
            urlRequest.allHTTPHeaderFields = HTTPCookie.requestHeaderFields(with: cookies)
        }
        uiView.load(urlRequest)
    }
}

struct githubView: View {
    @State var isLoggedIn: Bool = false
    @State var loginRequired: Bool = false
//    @State var provider = OAuthProvider(providerID: "github.com")
//    @State var credential: OAuthCredential!
//    @State var isLogged: Bool = false
    
    func login() {
        let urlString = "https://github.com/login/oauth/access_token"
        if let tokenUrl = URL(string: urlString) {
            print("1")
            let req = NSMutableURLRequest(url: tokenUrl)
            req.httpMethod = "POST"
            req.addValue("application/json", forHTTPHeaderField: "Content-Type")
            req.addValue("application/json", forHTTPHeaderField: "Accept")
            print("2")
            let params = [
                "client_id" : "919dcc45602ba0b18b15",
                "client_secret" : "e2c1920e618c144aa4bbeb6f25a9b4c56b39f51b"
//                "code" : code
            ]
            print("3")
            req.httpBody = try? JSONSerialization.data(withJSONObject: params, options: [])
            print("4")
            let task = URLSession.shared.dataTask(with: req as URLRequest) { data, response, error in
                print("5")
                if let data = data {
                    do {
                        if let content = try JSONSerialization.jsonObject(with: data, options: []) as? [String: AnyObject] {
                            print("6")
                            if let accessToken = content["access_token"] as? String {
                                print(accessToken)
                            }
                        }
                        print("7")
                    } catch {}
                }
            }
            task.resume()
        }
    }
    
    func fetch() {
//        guard let setTokenUrl = URL(string: "https://www.whispr-area.tech/api/service/github/setToken" + credential.accessToken!) else { return }
//        var setTokenRequest = URLRequest(url: setTokenUrl)
//        setTokenRequest.httpMethod = "POST"
//        setTokenRequest.setValue("include", forHTTPHeaderField: "credentials")
//
////        let bodyData = AccountLogIn(email: email, password: pwd)
////        let bodyJsonData = try JSONEncoder().encode(bodyData)
////        request.httpBody = bodyJsonData
//
//        URLSession.shared.dataTask(with: setTokenRequest) { (data,response,error) in
//            print("github/setToken")
//            if let error = error {
//                print("Error took place \(error)")
//                return
//            }
//            guard let data = data else {return}
//            guard let httpResponse = response as? HTTPURLResponse else { return }
//            if let jsonString = String(data: data, encoding: .utf8) {
//                print(jsonString)
//            }
//            print("\(httpResponse)")
////            if httpResponse.statusCode == 200 {
////                let decoder = JSONDecoder()
////                do {
////                    let decodedData = try decoder.decode(LoginResponse.self, from: data)
////                    print("\(decodedData)")
////                } catch {
////                    print("error occured \(error)")
////                }
////            } else {
////                errorMsg = "some error"
////            }
//
//        }.resume()

        guard let requestUrl = URL(string: "https://www.whispr-area.tech/api/service/github/getUser") else { return }
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        request.setValue("include", forHTTPHeaderField: "credentials")
        URLSession.shared.dataTask(with: request) { (data,response,error) in
            print("github/getUser")
            if let error = error {
                print("Error took place \(error)")
                return
            }
            guard let data = data else {return}
            guard let httpResponse = response as? HTTPURLResponse else { return }
            if let jsonString = String(data: data, encoding: .utf8) {
                print(jsonString)
            }
            print("\(httpResponse)")
//            if httpResponse.statusCode == 200 {
//                let decoder = JSONDecoder()
//                do {
//                    let decodedData = try decoder.decode(LoginResponse.self, from: data)
//                    print("\(decodedData)")
//                } catch {
//                    print("error occured \(error)")
//                }
//            } else {
//                errorMsg = "some error"
//            }

        }.resume()



    }
    
    var body: some View {
        VStack {
//            if !self.isLogged {
            if !self.loginRequired {
                Button(action: {
//                    self.login()
                    self.loginRequired = true
                }) {
                    Text("Login with Github")
                }
            } else {
                WebView()
            }
            
//            } else {
//                VStack(spacing: 20) {
//                    Widget(backgroundColor: Color.blue, stripColor: Color.red) {
//                        HStack {
//                            VStack(alignment: .leading) {
//                                Text("Subscribers :")
//                                    .font(.custom("Raleway-SemiBold", size: 40))
//                                    .foregroundColor(.white)
//                                HStack {
//                                    Spacer()
//                                    Text("+ 150")
//                                        .font(.custom("Raleway-SemiBold", size: 50))
//                                        .foregroundColor(.white)
//                                        .padding(.trailing, 20)
//                                    Spacer()
//                                }
//                            }
//                        }
//                        .padding()
//                    }
//                    Widget(backgroundColor: Color.blue, stripColor: Color.red) {
//                        Text("Widget")
//                    }
//                    Widget(backgroundColor: Color.blue, stripColor: Color.red) {
//                        Text("Widget")
//                    }
//                    Spacer()
//                }
//                .navigationBarTitle("Github")
//                .padding()
//                .onAppear(perform: fetch)
////                Text("\(self.credential.accessToken!)")
//            }
        }
    }
}

struct githubView_Previews: PreviewProvider {
    static var previews: some View {
        githubView()
    }
}
