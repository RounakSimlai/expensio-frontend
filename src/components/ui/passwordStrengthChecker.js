import zxcvbn from 'zxcvbn'
export default function PassCheck ({password}) {
  const testedResult = zxcvbn(password)

  const createPasswordLabel = (result) => {
    switch (result.score) {
    case 0:
      return 'Weakest'
    case 1:
      return 'Weak'
    case 2:
      return 'Fair'
    case 3:
      return 'Good'
    case 4:
      return 'Strong'
    default:
      return 'Weakest'
    }
  }

  return (
    <>
      <div className="password-strength-meter">
        <label
          className="password-strength-meter-label"
        >
          {password && (
            <>
              <strong>Password strength:</strong> {createPasswordLabel(testedResult)}
            </>
          )}
        </label>
        <progress
          className={`password-strength-meter-progress strength-${createPasswordLabel(testedResult)}`}
          value={testedResult.score}
          max="4"
        />
        <br />
      </div>
      <style scoped>

      </style>
    </>
  )
}