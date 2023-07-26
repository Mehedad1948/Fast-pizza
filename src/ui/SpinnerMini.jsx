function SpinnerMini() {
  return (
    <tr>
      <td className=" flex items-center justify-center">
        <svg
          className=" aspect-square w-36 origin-center animate-spin"
          viewBox="0 0 355 355"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M325.086 276.114C344.59 246.924 355 212.606 355 177.5H293.999C293.73 241.335 241.898 293 178 293C113.935 293 62 241.065 62 177C62 113.102 113.665 61.2704 177.5 61.0011V0C142.394 0 108.076 10.4102 78.8863 29.9141C49.6966 49.4181 26.9459 77.1398 13.5114 109.574C0.0768284 142.008 -3.43826 177.697 3.41061 212.129C10.2595 246.56 27.1647 278.188 51.9885 303.011C76.8124 327.835 108.44 344.741 142.871 351.589C177.303 358.438 212.992 354.923 245.426 341.489C277.86 328.054 305.582 305.303 325.086 276.114Z"
            fill="url(#paint0_angular_101_4)"
          />
          <defs>
            <radialGradient
              id="paint0_angular_101_4"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(177.5 177.5) rotate(2.74165) scale(177.703 177.703)"
            >
              <stop stopColor="#FF8514" />
              <stop offset="0.671875" stopColor="#FFF1E4" stopOpacity="0.89" />
              <stop offset="0.779287" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </td>
    </tr>
  );
}

export default SpinnerMini;
