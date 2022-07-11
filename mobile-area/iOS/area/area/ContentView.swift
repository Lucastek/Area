//
//  ContentView.swift
//  area
//
//  Created by Paul Erny on 09/02/2021.
//

import SwiftUI

struct ContentView: View {
    @State private var pwd: String = ""
    @State private var email: String = ""

    private var orange: Color = Color(red: 184/255, green: 95/255, blue: 73/255)
    private var black: Color = Color(red: 42/255, green: 40/255, blue: 35/255)

    var body: some View {
        LoginView()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
