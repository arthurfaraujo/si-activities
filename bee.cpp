#include <bits/stdc++.h>

using namespace std;

#define endl '\n'
#define spc ' '
 
int main() {
  int n;
  cin >> n;
  cin.ignore();

  for (int i = 0; i < n; i++) {
    string text;
    getline(cin, text);
    vector<int> ords;

    // primeira passada
    for (int c : text) {
      int ord;

      if ((c >= 65 || c <= 90) || (c >= 97 || c <= 122)) {
        cout << (char)c << " char c " << (char)(c + 3) << " char c + 3" << spc;
        ord = c + 3;
      } else {
        ord = c;
      }
      ords.push_back(ord);
    }

    cout << "primeira\n";
    for (int c : ords) {
      cout << (char)c;
    }
    cout << endl;

    cout << "segunda\n";
    // segunda passada
    reverse(ords.begin(), ords.end());

    for (char c : ords) {
      cout << c;
    }
    cout << endl;


    cout << "terceira\n";
    // terceira passada
    for (int i = (int)ords.size() / 2; i < ords.size(); i++) {
      ords[i] = (int)ords[i] - 1;
    }

    for (char c : ords) {
      cout << c;
    }

    cout << endl;
  }
  return 0;
}