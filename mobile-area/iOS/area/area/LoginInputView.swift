//
//  LoginInputView.swift
//  area
//
//  Created by Paul Erny on 11/02/2021.
//

import SwiftUI

struct LoginInputView: View {
    
    @Binding var fieldData: String
    public let fieldName: String
    public let isSecure: Bool
    
    let black: Color = Color(red: 42/255, green: 40/255, blue: 35/255)
    let borderColor: Color = Color(red: 112/255, green: 112/255, blue: 112/255)
    let lightGray: Color = Color(red: 239/255, green: 243/255, blue: 244/255)
    
    var body: some View {
        if isSecure == false {
            TextField(fieldName, text: $fieldData)
                .padding()
                .background(lightGray)
                .cornerRadius(5)
                .font(.custom("Raleway-SemiBold", size: 20))
        } else {
            SecureField(fieldName, text: $fieldData)
                .padding()
                .background(lightGray)
                .cornerRadius(5)
                .font(.custom("Raleway-SemiBold", size: 20))
        }
    }
}

//struct LoginInputView_Previews: PreviewProvider {
//    @State var dataHolder: String = ""
//    static var previews: some View {
//        LoginInputView(fieldData: $dataHolder, fieldName: "email", isSecure: true)
//    }
//}
