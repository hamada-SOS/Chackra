// src/defaultCodeSnippets.ts

export const defaultCodeSnippets: { [key: string]: string } = {
    python: `print("Hello, World!")`,
    java: `
  public class Main {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }
    `,
    cpp: `
  #include <iostream>
  using namespace std;
  
  int main() {
      cout << "Hello, World!" << endl;
      return 0;
  }
    `,
  };
  