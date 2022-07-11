//
//  LoginView.swift
//  area
//
//  Created by Paul Erny on 03/03/2021.
//

import SwiftUI

struct LoginView: View {
    
    @State var pwd: String = ""
    @State var email: String = ""
    @State var userID: String = ""

    @State private var isLogged: Bool = false
    @State private var didLoginFail: Bool = false
    @State private var errorMsg: String = ""
    private let orange: Color = Color(red: 184/255, green: 95/255, blue: 73/255)
    private let black: Color = Color(red: 42/255, green: 40/255, blue: 35/255)
    
    var body: some View {
        
        if isLogged {
            servicesView(userID: userID)
        } else {
            NavigationView {
                VStack {
                    Text("AREA")
                        .font(.custom("Raleway-ExtraBold", size: 100))
                        .foregroundColor(black)
                    
                    Image("login_logo")
                        .resizable()
                        .frame(width: 121, height: 86)
                        .padding(10)
                    
                    VStack(spacing: 5) {
                        LoginInputView(fieldData: $email, fieldName: "Email", isSecure: false)
                            .padding()
                            .frame(height: 50)
                            .padding(.bottom, 20)
                        LoginInputView(fieldData: $pwd, fieldName: "Password", isSecure: false)
                            .padding()
                            .frame(height: 50)
                            .padding(.bottom, 20)
                        
                        if didLoginFail {
                            Text(errorMsg)
                                .foregroundColor(.red)
                                .font(.custom("Raleway-ExtraBold", size: 15))
                        }
                        
                        Button(action: {
                            
                            if email.isEmpty || pwd.isEmpty {
                                didLoginFail = true
                                errorMsg = "Field is mandatory"
                                return
                            }

                            do {
                                
                                guard let requestUrl = URL(string: "https://www.whispr-area.tech/api/auth/login") else { return }
                                var request = URLRequest(url: requestUrl)
                                request.httpMethod = "POST"
                                request.setValue("application/json", forHTTPHeaderField: "Content-Type")
                                let bodyData = AccountLogIn(email: email, password: pwd)
                                let bodyJsonData = try JSONEncoder().encode(bodyData)
                                request.httpBody = bodyJsonData
                                
                                URLSession.shared.dataTask(with: request) { (data,response,error) in
                                    if let error = error {
                                        print("Error took place \(error)")
                                        return
                                    }
                                    guard let data = data else {return}
                                    guard let httpResponse = response as? HTTPURLResponse else { return }
                                    if httpResponse.statusCode == 200 {
                                        didLoginFail = false
                                        isLogged = true
                                        let decoder = JSONDecoder()
                                        do {
                                            let decodedData = try decoder.decode(LoginResponse.self, from: data)
                                            userID = decodedData._id
                                        } catch {
                                            print("error occured \(error)")
                                        }
                                    } else {
                                        didLoginFail = true
                                        errorMsg = "Username and password not matching"
                                    }

                                }.resume()
                            } catch {
                                print("error occured \(error)")
                            }
                        }) {
                            Text("Login")
                                .frame(width: 220, height: 50)
                                .background(black)
                                .cornerRadius(35)
                                .foregroundColor(.white)
                                .font(.custom("Raleway-SemiBold", size: 20))
                        }
                        
                        NavigationLink(destination: registerView() ) {
                            VStack(spacing: 0) {
                                Text("not registered yet ?")
                                    .font(.custom("Raleway-SemiBold", size: 20))
                                    .foregroundColor(orange)
                                    .padding(.top, 10)
                                Rectangle()
                                    .fill(orange)
                                    .frame(width: 155, height: 2)
                                    .padding(.top, 2)
                                    .edgesIgnoringSafeArea(.horizontal)
                                Text("sign up")
                                    .font(.custom("Raleway-SemiBold", size: 20))
                                    .foregroundColor(orange)
                            }
                            .navigationBarTitle("")
                            .navigationBarHidden(true)
                        }
                        .navigationBarTitle("")
                        .navigationBarBackButtonHidden(true)
                        .navigationBarHidden(true)
                    }
                }
            }
            .navigationBarTitle("")
            .navigationBarBackButtonHidden(true)
            .navigationBarHidden(true)
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
