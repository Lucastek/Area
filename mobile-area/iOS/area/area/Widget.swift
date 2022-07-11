//
//  Widget.swift
//  area
//
//  Created by Paul Erny on 12/03/2021.
//

import SwiftUI

struct Triangle: Shape {
    
    var insetAmount: CGFloat
    
    
    var animatableData: CGFloat {
        get { insetAmount }
        set { self.insetAmount = newValue }
    }
    
    func path(in rect: CGRect) -> Path {
        var path = Path()

        path.move(to: CGPoint(x: 380, y: 0))
        path.addLine(to: CGPoint(x: 225 - self.insetAmount, y: 0))
        path.addLine(to: CGPoint(x: 138 - self.insetAmount, y: 150))
        path.addLine(to: CGPoint(x: 380, y: 150))
        
        return path
    }
}

struct Widget<Content: View>: View {
    
    var backgroundColor: Color
    var stripColor: Color
    let content: Content
    var isActive: Bool
    @State var isTapped: Bool = false
    @State var insetAmount: CGFloat = 95
        
    init(backgroundColor: Color, stripColor: Color, isActive: Bool, @ViewBuilder content: () -> Content) {
        self.backgroundColor = backgroundColor
        self.stripColor = stripColor
        self.isActive = isActive
        self.content = content()
        self.isTapped = self.isActive
    }
    
    var body: some View {
        ZStack {
            Rectangle()
                .foregroundColor(backgroundColor)
                .cornerRadius(15)
                .shadow(color: backgroundColor, radius: 10)
            self.content
            Triangle(insetAmount: self.insetAmount)
                .foregroundColor(stripColor)
                .shadow(color: stripColor, radius: 15, x: -10.0, y: 0.0)
                .cornerRadius(15)
        }
        .frame(width: 380, height: 150)
        .onAppear(perform: {
            self.insetAmount = self.isActive ? -135 : 95
            self.isTapped = self.isActive
        })
        .onTapGesture {
            withAnimation {
                self.isTapped = !self.isTapped
                if (isTapped) {
                    self.insetAmount = -135
                } else {
                    self.insetAmount = 95
                }
            }
        }
    }
}

struct Widget_Previews: PreviewProvider {
    
    static let widgetBgColor: Color = Color(red: 61/255, green: 61/255, blue: 61/255)
    static let widgetStripColor: Color = Color(red: 33/255, green: 33/255, blue: 33/255)
    static var lightGreen: Color = Color(red: 144/255, green: 200/255, blue: 144/255)
    
    static var previews: some View {
        Widget(backgroundColor: widgetBgColor, stripColor: widgetStripColor, isActive: true) {
            HStack {
                VStack(alignment: .leading) {
                    Text("Subscribers :")
                        .font(.custom("Raleway-SemiBold", size: 40))
                        .foregroundColor(.white)
                    HStack {
                        Spacer()
                        Text("+ 150")
                            .font(.custom("Raleway-SemiBold", size: 50))
                            .foregroundColor(lightGreen)
                            .padding(.trailing, 20)
                        Spacer()
                    }
                }
            }
            .padding()
        }
    }
}
