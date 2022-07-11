//
//  facebookView.swift
//  area
//
//  Created by Paul Erny on 08/03/2021.
//

import SwiftUI
//import Firebase
import FBSDKLoginKit

struct fbLogin: UIViewRepresentable {

    @EnvironmentObject var facebookDelegate: FacebookDelegate

    func makeCoordinator() -> FacebookDelegate {
        return facebookDelegate
    }

    func makeUIView(context: UIViewRepresentableContext<fbLogin>) -> FBLoginButton  {
        let button = FBLoginButton()
        button.permissions = ["email"]
        button.delegate = context.coordinator
        return button
    }

    func updateUIView(_ uiView: FBLoginButton, context: UIViewRepresentableContext<fbLogin>) {
    }
}

struct facebookView: View {

    @EnvironmentObject var facebookDelegate: FacebookDelegate
    @State var widgetsData: FacebookDataModel = FacebookDataModel()
    @State var profilePicture: UIImage = UIImage()
    @State var fbBlue = Color(red: 15/255, green: 103/255, blue: 217/255)
    @State var fbLightBlue = Color(red: 24/255, green: 25/255, blue: 26/255)
    @State var lightBlue = Color(red: 219/255, green: 237/255, blue: 255/255)
    @State var isDataFetched = false
    
    func fetch() {
        self.isDataFetched = false
        guard let setTokenUrl = URL(string: "https://www.whispr-area.tech/api/service/facebook/setToken/" + AccessToken.current!.tokenString) else { return }
        var setTokenRequest = URLRequest(url: setTokenUrl)
        setTokenRequest.httpMethod = "POST"
        setTokenRequest.setValue("include", forHTTPHeaderField: "credentials")

//        let bodyData = AccountLogIn(email: email, password: pwd)
//        let bodyJsonData = try JSONEncoder().encode(bodyData)
//        request.httpBody = bodyJsonData

        URLSession.shared.dataTask(with: setTokenRequest) { (data,response,error) in
            print("setToken")
            if let error = error {
                print("Error took place \(error)")
                return
            }
            guard let data = data else {return}
            guard let httpResponse = response as? HTTPURLResponse else { return }
            if let jsonString = String(data: data, encoding: .utf8) {
                print(jsonString)
            }
        }.resume()

        guard let requestUrl = URL(string: "https://www.whispr-area.tech/api/service/facebook/user") else { return }
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        request.setValue("include", forHTTPHeaderField: "credentials")
        URLSession.shared.dataTask(with: request) { (data,response,error) in
            print("GET facebook/user")
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
                    let decodedData = try decoder.decode(FacebookDataModel.self, from: data)
                    DispatchQueue.main.async {
                        self.widgetsData = decodedData
                        print("\(String(describing: self.widgetsData))")
                    }
                    
                    // download profile image
                    guard let url = URL(string: (decodedData.picture?.data?.url)!) else { return }
                    URLSession.shared.dataTask(with: url) { data, response, error in
                        guard let data = data else { return }
                        DispatchQueue.main.async {
                            self.profilePicture = UIImage(data: data) ?? UIImage()
                            self.isDataFetched = true
                        }
                    }.resume()
                    
                } catch {
                    print("error occured \(error)")
                }
            } else {
                print("error: couldnt decode youtube data")
            }
            
        }.resume()
    }
    
    var body: some View {
        VStack {
            if !self.facebookDelegate.isLogged {
                fbLogin()
                    .frame(width:  100, height: 28)
            } else {
                VStack(spacing: 20) {
                    Widget(backgroundColor: self.fbLightBlue, stripColor: self.fbBlue, isActive: true) {
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Hello")
                                    .font(.custom("Raleway-SemiBold", size: 40))
                                    .foregroundColor(.white)
                                Text(self.widgetsData.name!.components(separatedBy: " ")[0] )
                                    .font(.custom("Raleway-SemiBold", size: 50))
                                    .foregroundColor(lightBlue)
                                    .padding(.trailing, 20)
                            }
                            Image(uiImage: self.profilePicture)
                                .resizable()
                                .frame(width: 75, height: 75)
                                .clipShape(Circle())
                                .shadow(radius: 10)
                                .padding()
                        }
                        .padding()
                    }
                    Widget(backgroundColor: self.fbLightBlue, stripColor: self.fbBlue, isActive: false) {
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Liked :")
                                    .font(.custom("Raleway-SemiBold", size: 40))
                                    .foregroundColor(.white)
                                HStack {
                                    Spacer()
                                    Text("\(self.widgetsData.likes?.data!.count ?? 0)")
                                        .font(.custom("Raleway-SemiBold", size: 50))
                                        .foregroundColor(lightBlue)
                                        .padding(.trailing, 20)
                                    Spacer()
                                }
                            }
                        }
                        .padding()
                    }
                    Widget(backgroundColor: self.fbLightBlue, stripColor: self.fbBlue, isActive: false) {
                        HStack {
                            VStack(alignment: .leading) {
                                Text("Friends :")
                                    .font(.custom("Raleway-SemiBold", size: 40))
                                    .foregroundColor(.white)
                                HStack {
                                    Spacer()
//                                    if self.widgetsData.friends?.data!.count != nil {
                                        Text("\(self.widgetsData.friends?.data!.count ?? 0)")
                                            .font(.custom("Raleway-SemiBold", size: 50))
                                            .foregroundColor(lightBlue)
                                            .padding(.trailing, 20)
                                    Spacer()
                                }
                            }
                        }
                        .padding()
                    }
                    Widget(backgroundColor: self.fbLightBlue, stripColor: self.fbBlue, isActive: false) {
                        HStack {
                            VStack(alignment: .leading) {
                                Text("birthday date :")
                                    .font(.custom("Raleway-SemiBold", size: 40))
                                    .foregroundColor(.white)
                                HStack {
                                    Spacer()
                                    Text(self.widgetsData.birthday!)
                                        .font(.custom("Raleway-SemiBold", size: 50))
                                        .foregroundColor(lightBlue)
                                        .padding(.trailing, 20)
                                    Spacer()
                                }
                            }
                        }
                        .padding()
                    }
                    fbLogin()
                        .frame(width:  100, height: 28)
                    Spacer()
                }
//                .navigationBarHidden(true)
//                .navigationBarTitle("Hello \(self.widgetsData.name!)")
                .onAppear(perform: fetch)
//            } // TMP
            }
        }
    }
}

struct facebookView_Previews: PreviewProvider {
    static var previews: some View {
        facebookView()
//            .environmentObject((UIApplication.shared.delegate as! AppDelegate).googleDelegate)
    }
}
