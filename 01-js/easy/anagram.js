/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // Remove spaces and convert to lowercase for case-insensitive comparison
  str1 = str1.replaceAll(" ","").toLowerCase()
  str2 = str2.replaceAll(" ","").toLowerCase()
  // If lengths don't match, they can't be anagrams
  if (str1.length !== str2.length)
    return false
  // Sort both strings and compare
  if (str1.split("").sort().join("") !== str2.split("").sort().join(""))
    return false

  return true
}

module.exports = isAnagram;
