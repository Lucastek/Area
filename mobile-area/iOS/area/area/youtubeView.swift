//
//  youtubeView.swift
//  area
//
//  Created by Paul Erny on 08/03/2021.
//

import Firebase
import GoogleSignIn
import SwiftUI

struct youtubeView: View {

    @EnvironmentObject var googleDelegate: GoogleDelegate
    @State var widgetBgColor = Color(red: 61/255, green: 61/255, blue: 61/255)
    @State var widgetStripColor = Color(red: 33/255, green: 33/255, blue: 33/255)
    @State var lightGreen = Color(red: 144/255, green: 200/255, blue: 144/255)
    @State var lightRed = Color(red: 219/255, green: 237/255, blue: 255/255)
    @State var signInBtn: Image = Image("btn_google_signin_light_normal_web")
//    @State var widgetsData: YoutubeData!
    @State var widgetsData: YoutubeData = YoutubeData(viewCount: "?", suscriberCount: "?", videoCount: "?", chanelName: "Whispr")
    
    struct YoutubeData: Codable {
        var viewCount: String
        var suscriberCount: String
        var videoCount: String
        var chanelName: String
    }
    
    func fetch() {
        guard let setTokenUrl = URL(string: "https://www.whispr-area.tech/api/service/google/setToken/" + googleDelegate.accessToken) else { return }
        var setTokenRequest = URLRequest(url: setTokenUrl)
        setTokenRequest.httpMethod = "POST"
        setTokenRequest.setValue("include", forHTTPHeaderField: "credentials")

//        let bodyData = AccountLogIn(email: email, password: pwd)
//        let bodyJsonData = try JSONEncoder().encode(bodyData)
//        request.httpBody = bodyJsonData

        URLSession.shared.dataTask(with: setTokenRequest) { (data,response,error) in
            if let error = error {
                print("Error took place \(error)")
                return
            }
            guard let data = data else {return}
            guard let httpResponse = response as? HTTPURLResponse else { return }
//            if let jsonString = String(data: data, encoding: .utf8) {
//                print(jsonString)
//            }
//            print("\(httpResponse)")
//            if httpResponse.statusCode == 200 {
//                let decoder = JSONDecoder()
//                do {
//                    let decodedData = try decoder.decode(YoutubeData.self, from: data)
//                    print("\(decodedData)")
//                } catch {
//                    print("error occured \(error)")
//                }
//            } else {
//                print("error: couldnt decode youtube data")
//            }

        }.resume()

        guard let requestUrl = URL(string: "https://www.whispr-area.tech/api/service/google/chanel") else { return }
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        request.setValue("include", forHTTPHeaderField: "credentials")
        URLSession.shared.dataTask(with: request) { (data,response,error) in
            if let error = error {
                print("Error took place \(error)")
                return
            }
            guard let data = data else {return}
            guard let httpResponse = response as? HTTPURLResponse else { return }
//            if let jsonString = String(data: data, encoding: .utf8) {
//                print(jsonString)
//            }
//            print("\(httpResponse)")
            if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
                let decoder = JSONDecoder()
                do {
                    let decodedData = try decoder.decode(YoutubeData.self, from: data)
                    DispatchQueue.main.async {
                        self.widgetsData = decodedData
                        print("\(String(describing: self.widgetsData))")
                    }
                } catch {
                    print("error occured \(error)")
                }
            } else {
                print("error: couldnt decode youtube data")
            }

        }.resume()
    }
    
    var body: some View {
        if (!self.googleDelegate.isSignedIn) {
            VStack {
                Text("To use this service, you first have to")
                    .font(.custom("Raleway-SemiBold", size: 20))
                self.signInBtn
                    .onTapGesture {
                        self.signInBtn = Image("btn_google_signin_light_pressed_web")
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                            GIDSignIn.sharedInstance()?.scopes.append("https://www.googleapis.com/auth/youtube")
                            GIDSignIn.sharedInstance()?.scopes.append("https://www.googleapis.com/auth/youtube.force-ssl")
                            GIDSignIn.sharedInstance()?.presentingViewController = UIApplication.shared.windows.first?.rootViewController

                            GIDSignIn.sharedInstance()?.signIn()
                        }
                    }
            }
        } else {
            VStack(spacing: 20) {
                Widget(backgroundColor: widgetBgColor, stripColor: widgetStripColor, isActive: true) {
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Channel Name :")
                                .font(.custom("Raleway-SemiBold", size: 40))
                                .foregroundColor(.white)
                            HStack {
                                Spacer()
                                Text(self.widgetsData.chanelName)
                                    .font(.custom("Raleway-SemiBold", size: 50))
                                    .foregroundColor(lightRed)
                                    .padding(.trailing, 20)
                                Spacer()
                            }
                        }
                    }
                    .padding()
                }
                Widget(backgroundColor: widgetBgColor, stripColor: widgetStripColor, isActive: false) {
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Subscribers :")
                                .font(.custom("Raleway-SemiBold", size: 40))
                                .foregroundColor(.white)
                            HStack {
                                Spacer()
                                Text(self.widgetsData.suscriberCount)
                                    .font(.custom("Raleway-SemiBold", size: 50))
                                    .foregroundColor(lightRed)
                                    .padding(.trailing, 20)
                                Spacer()
                            }
                        }
                    }
                    .padding()
                }
                Widget(backgroundColor: widgetBgColor, stripColor: widgetStripColor, isActive: false) {
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Total views :")
                                .font(.custom("Raleway-SemiBold", size: 40))
                                .foregroundColor(.white)
                            HStack {
                                Spacer()
                                Text(self.widgetsData.viewCount)
                                    .font(.custom("Raleway-SemiBold", size: 50))
                                    .foregroundColor(lightRed)
                                    .padding(.trailing, 20)
                                Spacer()
                            }
                        }
                    }
                    .padding()
                }
                Widget(backgroundColor: widgetBgColor, stripColor: widgetStripColor, isActive: false) {
                    HStack {
                        VStack(alignment: .leading) {
                            Text("Videos uploaded :")
                                .font(.custom("Raleway-SemiBold", size: 40))
                                .foregroundColor(.white)
                            HStack {
                                Spacer()
                                Text(self.widgetsData.videoCount)
                                    .font(.custom("Raleway-SemiBold", size: 50))
                                    .foregroundColor(lightRed)
                                    .padding(.trailing, 20)
                                Spacer()
                            }
                        }
                    }
                    .padding()
                }
                Spacer()
            }
            .navigationBarTitle("Hello \((googleDelegate.user?.profile.givenName )!)")
            .padding()
            .onAppear(perform: fetch)
        }
    }
}

struct youtubeView_Previews: PreviewProvider {
    
    static var previews: some View {
        youtubeView()
            .environmentObject((UIApplication.shared.delegate as! AppDelegate).googleDelegate)
    }
}
